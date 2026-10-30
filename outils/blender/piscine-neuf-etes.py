"""La piscine de Neuf Étés qui se remplit, en rendu photoréaliste, pour le premier écran du
site : le défilement de la page fait avancer 96 images rendues ici (Cycles).

    /Applications/Blender.app/Contents/MacOS/Blender --background --factory-startup \
        --python outils/blender/piscine-neuf-etes.py -- <dossier de sortie> \
        [--cadrage ordinateur|telephone|les-deux] [--images 1,48,96] [--apercu]

Produit <dossier>/ordinateur/0001.webp … (1280 × 800) et <dossier>/telephone/0001.webp …
(720 × 1280). L'histoire, en 96 images : le bassin vide en fin de journée (1-12), l'eau qui
monte pendant que la caméra descend vers elle (12-84), le bassin plein et calme (84-96).

Tout est construit ici : géométrie, mosaïque, travertin, enduit, eau, ciel physique de
Blender. Une seule texture libre, le plancher de la terrasse (Poly Haven, CC0), est lue
dans l'atelier de la Réserve si elle y est ; sinon un bois uni la remplace. Rien n'est
téléchargé.
"""

import math
import os
import sys

import addon_utils
import bmesh
import bpy
from mathutils import Vector

ARGS = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
SORTIE = os.path.abspath(ARGS[0] if ARGS and not ARGS[0].startswith("--") else "public/exemples/neuf-etes/piscine")
APERCU = "--apercu" in ARGS


def option(nom, defaut):
    return ARGS[ARGS.index(nom) + 1] if nom in ARGS else defaut


CADRAGES = {"les-deux": ["ordinateur", "telephone"]}.get(option("--cadrage", "les-deux"), [option("--cadrage", "les-deux")])
IMAGES = 96
CHOISIES = [int(x) for x in option("--images", "").split(",") if x] or list(range(1, IMAGES + 1))
TEXTURES = os.path.expanduser("~/Ateliers/reserve/blender/textures")

# Le bassin : 8 × 4 m intérieur, 1,40 m de fond ; la margelle affleure à z = 0.
L, P, FOND, PLEIN, MARGELLE = 8.0, 4.0, -1.4, -0.1, 0.34


def lineaire(hexa):
    """#RRGGBB (sRGB) vers les valeurs linéaires qu'attend Blender."""
    c = [int(hexa[i : i + 2], 16) / 255 for i in (1, 3, 5)]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c) + (1.0,)


def lisse(a, b, t):
    x = min(1.0, max(0.0, (t - a) / (b - a)))
    return x * x * (3 - 2 * x)


# ------------------------------------------------------------------ la scène

bpy.ops.wm.read_factory_settings(use_empty=True)
addon_utils.enable("cycles", default_set=True)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
prefs = bpy.context.preferences.addons["cycles"].preferences
prefs.compute_device_type = "METAL"
prefs.get_devices()
for d in prefs.devices:
    d.use = d.type == "METAL"
scene.cycles.device = "GPU"
scene.cycles.samples = 24 if APERCU else 64
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 10
scene.cycles.transmission_bounces = 10
scene.cycles.caustics_reflective = False
scene.cycles.caustics_refractive = False
scene.view_settings.view_transform = "AgX"
looks = [x.identifier for x in scene.view_settings.bl_rna.properties["look"].enum_items]
scene.view_settings.look = next((l for l in looks if "Medium High" in l), "None")
scene.view_settings.exposure = 0.55
scene.frame_start, scene.frame_end = 1, IMAGES
scene.render.fps = 24


def matiere(nom):
    m = bpy.data.materials.new(nom)
    m.use_nodes = True
    return m, m.node_tree.nodes, m.node_tree.links, m.node_tree.nodes["Principled BSDF"]


def texture_image(nodes, chemin, couleur=True):
    if not os.path.exists(chemin):
        return None
    n = nodes.new("ShaderNodeTexImage")
    n.image = bpy.data.images.load(chemin)
    if not couleur:
        n.image.colorspace_settings.name = "Non-Color"
    return n


def coordonnees(nodes, links, echelle):
    tc = nodes.new("ShaderNodeTexCoord")
    mp = nodes.new("ShaderNodeMapping")
    mp.inputs["Scale"].default_value = (echelle, echelle, echelle)
    links.new(tc.outputs["UV"], mp.inputs["Vector"])
    return mp


def poly_haven(nom, echelle, teinte=None, rugosite=None):
    """Une matière Poly Haven de la Réserve (couleur, rugosité, relief), ou None."""
    dossier = os.path.join(TEXTURES, nom)
    if not os.path.isdir(dossier):
        return None
    m, nodes, links, bsdf = matiere(nom)
    mp = coordonnees(nodes, links, echelle)
    diff = texture_image(nodes, os.path.join(dossier, "Diffuse.jpg"))
    rough = texture_image(nodes, os.path.join(dossier, "Rough.jpg"), False)
    nor = texture_image(nodes, os.path.join(dossier, "nor_gl.jpg"), False)
    for t in (diff, rough, nor):
        if t:
            links.new(mp.outputs["Vector"], t.inputs["Vector"])
    if diff:
        if teinte:
            mix = nodes.new("ShaderNodeMix")
            mix.data_type = "RGBA"
            mix.blend_type = "MULTIPLY"
            mix.inputs["Factor"].default_value = 1.0
            links.new(diff.outputs["Color"], mix.inputs["A"])
            mix.inputs["B"].default_value = lineaire(teinte)
            links.new(mix.outputs["Result"], bsdf.inputs["Base Color"])
        else:
            links.new(diff.outputs["Color"], bsdf.inputs["Base Color"])
    if rough and rugosite is None:
        links.new(rough.outputs["Color"], bsdf.inputs["Roughness"])
    elif rugosite is not None:
        bsdf.inputs["Roughness"].default_value = rugosite
    if nor:
        nm = nodes.new("ShaderNodeNormalMap")
        links.new(nor.outputs["Color"], nm.inputs["Color"])
        links.new(nm.outputs["Normal"], bsdf.inputs["Normal"])
    return m


def bruit_couleur(nodes, links, bsdf, a, b, echelle, entree="Base Color", coord=None):
    n = nodes.new("ShaderNodeTexNoise")
    n.inputs["Scale"].default_value = echelle
    n.inputs["Detail"].default_value = 8
    if coord is not None:
        links.new(coord, n.inputs["Vector"])
    r = nodes.new("ShaderNodeValToRGB")
    r.color_ramp.elements[0].color = lineaire(a)
    r.color_ramp.elements[1].color = lineaire(b)
    links.new(n.outputs["Fac"], r.inputs["Fac"])
    links.new(r.outputs["Color"], bsdf.inputs[entree])
    return n


def relief(nodes, links, bsdf, source, force=0.2, distance=0.01):
    bp = nodes.new("ShaderNodeBump")
    bp.inputs["Strength"].default_value = force
    bp.inputs["Distance"].default_value = distance
    links.new(source, bp.inputs["Height"])
    links.new(bp.outputs["Normal"], bsdf.inputs["Normal"])
    return bp


# --- les matières

def m_travertin(nom="travertin", dalles=0.0):
    m, nodes, links, bsdf = matiere(nom)
    tc = nodes.new("ShaderNodeTexCoord")
    bsdf.inputs["Roughness"].default_value = 0.62
    if dalles:
        br = nodes.new("ShaderNodeTexBrick")
        br.offset = 0.5
        br.inputs["Scale"].default_value = 1.0
        br.inputs["Brick Width"].default_value = dalles
        br.inputs["Row Height"].default_value = dalles
        br.inputs["Mortar Size"].default_value = 0.004
        br.inputs["Color1"].default_value = lineaire("#DCCDB6")
        br.inputs["Color2"].default_value = lineaire("#D2C1A8")
        br.inputs["Mortar"].default_value = lineaire("#A89A86")
        links.new(tc.outputs["Object"], br.inputs["Vector"])
        veine = nodes.new("ShaderNodeTexNoise")
        veine.inputs["Scale"].default_value = 3.5
        veine.inputs["Detail"].default_value = 12
        veine.inputs["Distortion"].default_value = 0.6
        links.new(tc.outputs["Object"], veine.inputs["Vector"])
        mel = nodes.new("ShaderNodeMix")
        mel.data_type = "RGBA"
        mel.blend_type = "OVERLAY"
        mel.inputs["Factor"].default_value = 0.35
        links.new(br.outputs["Color"], mel.inputs["A"])
        links.new(veine.outputs["Color"], mel.inputs["B"])
        links.new(mel.outputs["Result"], bsdf.inputs["Base Color"])
        relief(nodes, links, bsdf, br.outputs["Fac"], 0.35, 0.004)
    else:
        bruit_couleur(nodes, links, bsdf, "#E6DAC6", "#D5C5AC", 9, coord=tc.outputs["Object"])
        trous = nodes.new("ShaderNodeTexVoronoi")
        trous.inputs["Scale"].default_value = 60
        links.new(tc.outputs["Object"], trous.inputs["Vector"])
        relief(nodes, links, bsdf, trous.outputs["Distance"], 0.12, 0.003)
    return m


niveau = None  # l'objet eau, pour les pilotes des matières


def m_mosaique():
    """Mosaïque claire de 2,5 cm ; la frise bleue sur le haut des parois ; et la lumière qui
    danse sur tout ce qui est sous l'eau, réglée par le niveau de l'eau."""
    m, nodes, links, bsdf = matiere("mosaique")
    bsdf.inputs["Roughness"].default_value = 0.18
    tc = nodes.new("ShaderNodeTexCoord")
    br = nodes.new("ShaderNodeTexBrick")
    br.offset = 0.0
    br.inputs["Scale"].default_value = 1.0
    br.inputs["Brick Width"].default_value = 0.025
    br.inputs["Row Height"].default_value = 0.025
    br.inputs["Mortar Size"].default_value = 0.0018
    br.inputs["Color1"].default_value = lineaire("#EEF5F6")
    br.inputs["Color2"].default_value = lineaire("#E2EEF1")
    br.inputs["Mortar"].default_value = lineaire("#B9CCD0")
    links.new(tc.outputs["UV"], br.inputs["Vector"])
    # La frise : la bande du haut des parois, en bleu profond.
    pos = nodes.new("ShaderNodeNewGeometry")
    sep = nodes.new("ShaderNodeSeparateXYZ")
    links.new(pos.outputs["Position"], sep.inputs["Vector"])
    haut = nodes.new("ShaderNodeMath")
    haut.operation = "GREATER_THAN"
    haut.inputs[1].default_value = -0.17
    links.new(sep.outputs["Z"], haut.inputs[0])
    frise = nodes.new("ShaderNodeMix")
    frise.data_type = "RGBA"
    frise.blend_type = "MULTIPLY"
    links.new(haut.outputs[0], frise.inputs["Factor"])
    links.new(br.outputs["Color"], frise.inputs["A"])
    frise.inputs["B"].default_value = lineaire("#2F6F93")
    links.new(frise.outputs["Result"], bsdf.inputs["Base Color"])
    relief(nodes, links, bsdf, br.outputs["Fac"], 0.25, 0.002)
    # Les caustiques : un réseau de Voronoï animé, posé en émission sous le niveau.
    vo = nodes.new("ShaderNodeTexVoronoi")
    vo.voronoi_dimensions = "4D"
    vo.feature = "DISTANCE_TO_EDGE"
    vo.inputs["Scale"].default_value = 3.8
    links.new(pos.outputs["Position"], vo.inputs["Vector"])
    w = vo.inputs["W"].driver_add("default_value").driver
    w.expression = "frame / 40"
    ligne = nodes.new("ShaderNodeMapRange")
    ligne.inputs["From Min"].default_value = 0.0
    ligne.inputs["From Max"].default_value = 0.022
    ligne.inputs["To Min"].default_value = 1.0
    ligne.inputs["To Max"].default_value = 0.0
    links.new(vo.outputs["Distance"], ligne.inputs["Value"])
    niv = nodes.new("ShaderNodeValue")
    niv.name = "niveau"
    # Sous l'eau seulement, et de plus en plus en profondeur : une lueur turquoise de fond
    # (la lumière que l'eau diffuse) et, par-dessus, le réseau qui danse. Juste sous la
    # surface, rien : la ligne d'eau reste nette.
    prof = nodes.new("ShaderNodeMath")
    prof.operation = "SUBTRACT"
    links.new(niv.outputs[0], prof.inputs[0])
    links.new(sep.outputs["Z"], prof.inputs[1])
    rampe = nodes.new("ShaderNodeMapRange")
    rampe.inputs["From Min"].default_value = 0.04
    rampe.inputs["From Max"].default_value = 0.45
    links.new(prof.outputs[0], rampe.inputs["Value"])
    reseau = nodes.new("ShaderNodeMath")
    reseau.operation = "MULTIPLY_ADD"
    reseau.inputs[1].default_value = 0.5
    reseau.inputs[2].default_value = 0.2
    links.new(ligne.outputs["Result"], reseau.inputs[0])
    # moins de lumière dansante tant que l'eau est très basse
    rempli = nodes.new("ShaderNodeMapRange")
    rempli.inputs["From Min"].default_value = FOND + 0.02
    rempli.inputs["From Max"].default_value = FOND + 0.35
    links.new(niv.outputs[0], rempli.inputs["Value"])
    force = nodes.new("ShaderNodeMath")
    force.operation = "MULTIPLY"
    links.new(reseau.outputs[0], force.inputs[0])
    links.new(rampe.outputs["Result"], force.inputs[1])
    force2 = nodes.new("ShaderNodeMath")
    force2.operation = "MULTIPLY"
    links.new(force.outputs[0], force2.inputs[0])
    links.new(rempli.outputs["Result"], force2.inputs[1])
    bsdf.inputs["Emission Color"].default_value = lineaire("#CFF6FA")
    links.new(force2.outputs[0], bsdf.inputs["Emission Strength"])
    return m


def m_eau():
    m, nodes, links, bsdf = matiere("eau")
    bsdf.inputs["Base Color"].default_value = (1, 1, 1, 1)
    bsdf.inputs["Roughness"].default_value = 0.015
    bsdf.inputs["IOR"].default_value = 1.333
    bsdf.inputs["Transmission Weight"].default_value = 1.0
    vol = nodes.new("ShaderNodeVolumeAbsorption")
    vol.inputs["Color"].default_value = lineaire("#4FC6D8")
    vol.inputs["Density"].default_value = 0.22
    sortie = nodes["Material Output"]
    links.new(vol.outputs["Volume"], sortie.inputs["Volume"])
    return m


def m_simple(nom, couleur, rugosite=0.5, metal=0.0):
    m, nodes, links, bsdf = matiere(nom)
    bsdf.inputs["Base Color"].default_value = lineaire(couleur)
    bsdf.inputs["Roughness"].default_value = rugosite
    bsdf.inputs["Metallic"].default_value = metal
    return m


def m_verre():
    m, nodes, links, bsdf = matiere("verre")
    bsdf.inputs["Base Color"].default_value = lineaire("#DDE8EA")
    bsdf.inputs["Roughness"].default_value = 0.02
    bsdf.inputs["IOR"].default_value = 1.5
    bsdf.inputs["Transmission Weight"].default_value = 1.0
    bsdf.inputs["Thin Wall"].default_value = True
    return m


def m_feuillage(nom, a, b, echelle=14):
    m, nodes, links, bsdf = matiere(nom)
    tc = nodes.new("ShaderNodeTexCoord")
    bsdf.inputs["Roughness"].default_value = 0.75
    bsdf.inputs["Subsurface Weight"].default_value = 0.08
    n = bruit_couleur(nodes, links, bsdf, a, b, echelle, coord=tc.outputs["Object"])
    vo = nodes.new("ShaderNodeTexVoronoi")
    vo.inputs["Scale"].default_value = echelle * 4
    links.new(tc.outputs["Object"], vo.inputs["Vector"])
    relief(nodes, links, bsdf, vo.outputs["Distance"], 0.6, 0.02)
    return m


def m_pelouse():
    m, nodes, links, bsdf = matiere("pelouse")
    tc = nodes.new("ShaderNodeTexCoord")
    bsdf.inputs["Roughness"].default_value = 0.85
    bruit_couleur(nodes, links, bsdf, "#4E6B2E", "#6F8B3C", 3.2, coord=tc.outputs["Object"])
    brins = nodes.new("ShaderNodeTexNoise")
    brins.inputs["Scale"].default_value = 420
    brins.inputs["Detail"].default_value = 2
    links.new(tc.outputs["Object"], brins.inputs["Vector"])
    relief(nodes, links, bsdf, brins.outputs["Fac"], 0.8, 0.01)
    return m


M = {
    "travertin": m_travertin(),
    "dalles": m_travertin("dalles", 0.6),
    "mosaique": m_mosaique(),
    "eau": m_eau(),
    "inox": m_simple("inox", "#D4D8DB", 0.12, 1.0),
    "alu": m_simple("alu", "#2A2C2F", 0.35, 0.8),
    "verre": m_verre(),
    "toile": m_simple("toile", "#F1ECE2", 0.9),
    "teck": m_simple("teck", "#8A6143", 0.55),
    "pelouse": m_pelouse(),
    "haie": m_feuillage("haie", "#2D4423", "#4A6A30"),
    "cypres": m_feuillage("cypres", "#22341C", "#3E5A2C", 18),
    "olivier": m_feuillage("olivier", "#6B7650", "#9AA77C", 10),
    "tronc": m_simple("tronc", "#5C4A3A", 0.9),
    "pot": m_simple("pot", "#B46A43", 0.8),
    "lavande": m_feuillage("lavande", "#6E5A9C", "#9A86C8", 30),
    "interieur": m_simple("interieur", "#8A7462", 0.9),
}
def m_enduit():
    """Un enduit blanc cassé, finement taloché."""
    m, nodes, links, bsdf = matiere("enduit")
    tc = nodes.new("ShaderNodeTexCoord")
    bsdf.inputs["Roughness"].default_value = 0.88
    bruit_couleur(nodes, links, bsdf, "#ECE7DF", "#F4F1EB", 2.5, coord=tc.outputs["Object"])
    grain = nodes.new("ShaderNodeTexNoise")
    grain.inputs["Scale"].default_value = 180
    grain.inputs["Detail"].default_value = 6
    links.new(tc.outputs["Object"], grain.inputs["Vector"])
    relief(nodes, links, bsdf, grain.outputs["Fac"], 0.25, 0.003)
    return m


M["enduit"] = m_enduit()
M["bois"] = poly_haven("wood_floor", 0.6) or M["teck"]


# ------------------------------------------------------------------ la géométrie

def boite(nom, taille, position, mat, biseau=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=position)
    o = bpy.context.object
    o.name = nom
    o.scale = taille
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(mat)
    if biseau:
        b = o.modifiers.new("biseau", "BEVEL")
        b.width = biseau
        b.segments = 3
    deplier(o)
    return o


def deplier(o, echelle=1.0):
    """Coordonnées de texture en mètres, projetées selon l'orientation de chaque face."""
    bm = bmesh.new()
    bm.from_mesh(o.data)
    uv = bm.loops.layers.uv.verify()
    for f in bm.faces:
        n = f.normal
        for l in f.loops:
            p = o.matrix_world @ l.vert.co
            if abs(n.z) >= max(abs(n.x), abs(n.y)):
                l[uv].uv = (p.x * echelle, p.y * echelle)
            elif abs(n.x) >= abs(n.y):
                l[uv].uv = (p.y * echelle, p.z * echelle)
            else:
                l[uv].uv = (p.x * echelle, p.z * echelle)
    bm.to_mesh(o.data)
    bm.free()


def plan(nom, x0, x1, y0, y1, z, mat):
    bpy.ops.mesh.primitive_plane_add(size=1, location=((x0 + x1) / 2, (y0 + y1) / 2, z))
    o = bpy.context.object
    o.name = nom
    o.scale = (x1 - x0, y1 - y0, 1)
    bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(mat)
    deplier(o)
    return o


def cadre_troue(nom, ext, trou, z, mat):
    """Un rectangle percé d'un autre : quatre bandes."""
    (ex0, ex1, ey0, ey1), (tx0, tx1, ty0, ty1) = ext, trou
    plan(nom + "-1", ex0, ex1, ey0, ty0, z, mat)
    plan(nom + "-2", ex0, ex1, ty1, ey1, z, mat)
    plan(nom + "-3", ex0, tx0, ty0, ty1, z, mat)
    plan(nom + "-4", tx1, ex1, ty0, ty1, z, mat)


# Le sol : la pelouse, la plage de dalles autour du bassin et de sa margelle.
mx, my = L / 2 + MARGELLE, P / 2 + MARGELLE
cadre_troue("pelouse", (-120, 120, -120, 120), (-9.0, 11.6, -5.8, 5.8), -0.02, M["pelouse"])
cadre_troue("plage", (-9.0, 11.6, -5.8, 5.8), (-mx, mx, -my, my), 0.0, M["dalles"])

# La margelle : quatre pierres biseautées, qui débordent de 4 cm sur l'eau.
e = 0.05
boite("margelle-n", (L + 2 * MARGELLE, MARGELLE + 0.04, e), (0, P / 2 + MARGELLE / 2 - 0.02, e / 2 - 0.01), M["travertin"], 0.012)
boite("margelle-s", (L + 2 * MARGELLE, MARGELLE + 0.04, e), (0, -(P / 2 + MARGELLE / 2 - 0.02), e / 2 - 0.01), M["travertin"], 0.012)
boite("margelle-o", (MARGELLE + 0.04, P, e), (-(L / 2 + MARGELLE / 2 - 0.02), 0, e / 2 - 0.01), M["travertin"], 0.012)
boite("margelle-e", (MARGELLE + 0.04, P, e), (L / 2 + MARGELLE / 2 - 0.02, 0, e / 2 - 0.01), M["travertin"], 0.012)

# Le bassin : une boîte ouverte, faces tournées vers l'intérieur.
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, FOND / 2))
coque = bpy.context.object
coque.name = "coque"
coque.scale = (L, P, -FOND)
bpy.ops.object.transform_apply(scale=True)
bm = bmesh.new()
bm.from_mesh(coque.data)
for f in [f for f in bm.faces if f.normal.z > 0.9]:
    bm.faces.remove(f)
for f in bm.faces:
    f.normal_flip()
bm.to_mesh(coque.data)
bm.free()
coque.data.materials.append(M["mosaique"])
deplier(coque)

# L'échelle d'inox.
for dx in (-0.25, 0.25):
    pts = [(-1.6 + dx, P / 2 + 0.42, 0.0), (-1.6 + dx, P / 2 + 0.36, 0.62), (-1.6 + dx, P / 2 + 0.06, 0.72), (-1.6 + dx, P / 2 - 0.12, 0.5), (-1.6 + dx, P / 2 - 0.1, -0.9)]
    courbe = bpy.data.curves.new("echelle", "CURVE")
    courbe.dimensions = "3D"
    courbe.bevel_depth = 0.022
    courbe.bevel_resolution = 6
    s = courbe.splines.new("NURBS")
    s.points.add(len(pts) - 1)
    for i, p in enumerate(pts):
        s.points[i].co = (*p, 1)
    s.use_endpoint_u = True
    s.order_u = 3
    o = bpy.data.objects.new("echelle", courbe)
    o.data.materials.append(M["inox"])
    scene.collection.objects.link(o)
for z in (-0.25, -0.55, -0.85):
    boite("marche", (0.5, 0.09, 0.025), (-1.6, P / 2 - 0.12, z), M["inox"], 0.005)

# L'eau : une nappe finement maillée, ridée par une texture qui glisse, épaissie jusqu'au
# fond. Sa hauteur et son épaisseur suivent le remplissage.
bpy.ops.mesh.primitive_grid_add(x_subdivisions=200, y_subdivisions=100, size=1, location=(0, 0, PLEIN))
eau = bpy.context.object
eau.name = "eau"
eau.scale = (L - 0.002, P - 0.002, 1)
bpy.ops.object.transform_apply(scale=True)
eau.data.materials.append(M["eau"])
bpy.ops.object.shade_smooth()
bpy.ops.object.empty_add(location=(0, 0, 0))
vent = bpy.context.object
vent.name = "vent"
ride = bpy.data.textures.new("rides", type="CLOUDS")
ride.noise_scale = 0.35
ride.noise_depth = 3
dep = eau.modifiers.new("rides", "DISPLACE")
dep.texture = ride
dep.texture_coords = "OBJECT"
dep.texture_coords_object = vent
dep.mid_level = 0.5
epais = eau.modifiers.new("epaisseur", "SOLIDIFY")
epais.offset = -1.0
epais.use_even_offset = True

# La lame d'eau inox sur la margelle du fond, et le niveau qui pilote les caustiques.
boite("bouche", (0.14, 1.3, 0.05), (L / 2 + 0.08, 0, 0.06), M["inox"], 0.01)
pilote = M["mosaique"].node_tree.nodes["niveau"].outputs[0].driver_add("default_value").driver
pilote.type = "AVERAGE"
var = pilote.variables.new()
var.type = "TRANSFORMS"
var.targets[0].id = eau
var.targets[0].transform_type = "LOC_Z"

# La maison, au fond : deux volumes d'enduit blanc, une grande baie vitrée sur un séjour
# éclairé, un auvent ; la terrasse de bois devant.
boite("maison-bas", (6, 11, 3.2), (14.5, 0, 1.6), M["enduit"])
boite("maison-haut", (5.4, 7, 3.0), (14.8, -1.6, 4.7), M["enduit"])
boite("acrotere-bas", (6.2, 11.2, 0.16), (14.5, 0, 3.28), M["alu"])
boite("acrotere-haut", (5.6, 7.2, 0.16), (14.8, -1.6, 6.28), M["alu"])
boite("baie", (0.04, 6.6, 2.5), (11.48, 0.6, 1.3), M["verre"])
for y in (-2.7, -1.05, 0.6, 2.25, 3.9):
    boite("montant", (0.08, 0.07, 2.56), (11.46, y, 1.3), M["alu"])
boite("traverse", (0.08, 6.7, 0.08), (11.46, 0.6, 2.58), M["alu"])
boite("baie-haut", (0.04, 4.0, 1.6), (12.08, -1.4, 4.5), M["verre"])
boite("sejour", (0.05, 6.6, 2.5), (13.2, 0.6, 1.3), M["interieur"])
boite("canape", (0.9, 2.6, 0.45), (12.6, 0.6, 0.23), M["toile"], 0.05)
boite("auvent", (1.6, 7.4, 0.12), (10.9, 0.6, 3.05), M["alu"])
boite("terrasse", (4.0, 9.2, 0.1), (9.5, 0, 0.03), M["bois"])
bpy.ops.object.light_add(type="AREA", location=(12.4, 0.6, 2.4))
lampe = bpy.context.object
lampe.data.energy = 900
lampe.data.size = 4
lampe.data.color = (1.0, 0.72, 0.45)
lampe.rotation_euler = (0, math.radians(180), 0)

# Deux lits de jour bas sur la plage côté sud : un socle de teck, un matelas, un coussin.
for x in (-1.0, 1.4):
    boite("lit-socle", (0.9, 2.0, 0.2), (x, -3.75, 0.1), M["teck"], 0.02)
    boite("lit-matelas", (0.84, 1.94, 0.14), (x, -3.75, 0.27), M["toile"], 0.05)
    boite("lit-coussin", (0.6, 0.32, 0.14), (x, -4.45, 0.4), M["toile"], 0.06)


# Les murs du jardin : de l'enduit blanc, à hauteur d'homme, qui prennent la lumière
# rasante et portent de longues ombres. Au-delà, trois cyprès en silhouette.
for cote in (-1, 1):
    boite("mur", (20.5, 0.25, 1.7), (1.5, cote * 5.7, 0.85), M["enduit"], 0.01)
    boite("chaperon", (20.6, 0.32, 0.05), (1.5, cote * 5.7, 1.725), M["travertin"], 0.008)
for i, (x, y, h) in enumerate(((10.2, -7.6, 7.5), (11.6, -7.2, 6.4), (10.8, 7.5, 7.0), (24, -12, 9), (26, 9, 8))):
    bpy.ops.mesh.primitive_cone_add(radius1=0.75 + h * 0.03, radius2=0.08, depth=h, vertices=48, location=(x, y, h / 2))
    c = bpy.context.object
    c.data.materials.append(M["cypres"])
    sub = c.modifiers.new("lisse", "SUBSURF")
    sub.levels = sub.render_levels = 2
    t = bpy.data.textures.new("cypres-bosses", type="VORONOI")
    t.noise_scale = 0.35
    d = c.modifiers.new("bosses", "DISPLACE")
    d.texture = t
    d.strength = 0.18
    bpy.ops.object.shade_smooth()

# ------------------------------------------------------------------ la lumière

monde = bpy.data.worlds.new("ciel")
scene.world = monde
monde.use_nodes = True
wn = monde.node_tree.nodes
ciel = wn.new("ShaderNodeTexSky")
ciel.sky_type = "MULTIPLE_SCATTERING" if "MULTIPLE_SCATTERING" in [e.identifier for e in ciel.bl_rna.properties["sky_type"].enum_items] else "SINGLE_SCATTERING"
ELEVATION, AZIMUT = math.radians(14), math.radians(233)
ciel.sun_elevation = ELEVATION
ciel.sun_rotation = AZIMUT
ciel.sun_disc = False
ciel.air_density = 1.4
ciel.aerosol_density = 1.6
fond = wn["Background"]
fond.inputs["Strength"].default_value = 0.08
monde.node_tree.links.new(ciel.outputs["Color"], fond.inputs["Color"])

# ------------------------------------------------------------------ l'animation

# Le remplissage : vide jusqu'à l'image 12, plein à l'image 84, doucement aux deux bouts.
for f in range(1, IMAGES + 1):
    k = lisse(12, 84, f)
    z = FOND + 0.004 + (PLEIN - FOND - 0.004) * k
    eau.location.z = z
    eau.keyframe_insert("location", index=2, frame=f)
    epais.thickness = max(0.004, z - FOND - 0.03)
    eau.keyframe_insert(data_path='modifiers["epaisseur"].thickness', frame=f)
    # les rides : plus vives pendant que l'eau arrive, apaisées à la fin
    # (Sous 40 cm d'eau, la nappe reste plate : même minuscules, les rides y faisaient
    # des taches noires au rendu, nappe et fond trop proches pour Cycles.)
    dep.strength = (0.012 + 0.03 * (lisse(10, 30, f) * (1 - lisse(70, 96, f)))) * lisse(FOND + 0.4, FOND + 0.7, z)
    eau.keyframe_insert(data_path='modifiers["rides"].strength', frame=f)
    dep.show_render = z > FOND + 0.4
    eau.keyframe_insert(data_path='modifiers["rides"].show_render', frame=f)
    vent.location = (f * 0.012, f * 0.007, f * 0.004)
    vent.keyframe_insert("location", frame=f)

# Les deux caméras : de haut et de loin, puis jusqu'au ras de l'eau, au bout du bassin.
TRAJETS = {
    "ordinateur": dict(res=(1280, 800), lentille=32, depart=(-10.2, 4.6, 5.4), arrivee=(-6.5, 1.8, 1.15), vise0=(1.5, 0, -0.9), vise1=(5.5, 0, 0.6)),
    # Sur téléphone, le texte occupe la moitié basse de l'écran : la caméra regarde plus
    # bas que le bassin, pour qu'il se remplisse dans la moitié haute.
    "telephone": dict(res=(720, 1280), lentille=24, depart=(-10.4, 0.8, 7.4), arrivee=(-6.9, 0.35, 2.1), vise0=(-4.6, 0, -1.6), vise1=(-1.2, 0, -1.2)),
}


def camera(nom):
    t = TRAJETS[nom]
    bpy.ops.object.camera_add()
    cam = bpy.context.object
    cam.name = "camera-" + nom
    cam.data.lens = t["lentille"]
    cam.data.dof.use_dof = True
    cam.data.dof.aperture_fstop = 8
    bpy.ops.object.empty_add()
    vise = bpy.context.object
    c = cam.constraints.new("TRACK_TO")
    c.target = vise
    c.track_axis = "TRACK_NEGATIVE_Z"
    c.up_axis = "UP_Y"
    cam.data.dof.focus_object = vise
    for f in range(1, IMAGES + 1):
        k = lisse(1, IMAGES, f)
        k = k * k * (3 - 2 * k)
        cam.location = Vector(t["depart"]).lerp(Vector(t["arrivee"]), k)
        cam.keyframe_insert("location", frame=f)
        vise.location = Vector(t["vise0"]).lerp(Vector(t["vise1"]), k)
        vise.keyframe_insert("location", frame=f)
    return cam


bpy.ops.object.light_add(type="SUN")
soleil = bpy.context.object
soleil.data.energy = 4.8
soleil.data.angle = math.radians(0.6)
soleil.data.color = (1.0, 0.74, 0.5)
direction = Vector((math.cos(ELEVATION) * math.sin(AZIMUT), math.cos(ELEVATION) * math.cos(AZIMUT), math.sin(ELEVATION)))
soleil.rotation_euler = direction.to_track_quat("Z", "Y").to_euler()

# ------------------------------------------------------------------ le rendu

scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.quality = 74
for nom in CADRAGES:
    t = TRAJETS[nom]
    scene.render.resolution_x, scene.render.resolution_y = t["res"]
    scene.render.resolution_percentage = 50 if APERCU else 100
    scene.camera = camera(nom)
    dossier = os.path.join(SORTIE, nom)
    os.makedirs(dossier, exist_ok=True)
    for f in CHOISIES:
        scene.frame_set(f)
        scene.render.filepath = os.path.join(dossier, f"{f:04d}.webp")
        bpy.ops.render.render(write_still=True)
        print(f"{nom} image {f}/{IMAGES}", flush=True)
