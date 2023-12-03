import {
  ArxMap,
  DONT_QUADIFY,
  HudElements,
  QUADIFY,
  SHADING_SMOOTH,
  Settings,
  Texture,
  Vector3,
} from 'arx-level-generator'
import { createPlaneMesh } from 'arx-level-generator/prefabs/mesh'
import { Speed } from 'arx-level-generator/scripting/properties'
import { createLight } from 'arx-level-generator/tools'
import { applyTransformations } from 'arx-level-generator/utils'
import { MathUtils, Vector2 } from 'three'
import { Hat } from './entities/hat.js'
import { Present } from './entities/present.js'
import { xmasTreeMesh } from './prefabs/xmasTree.js'

const settings = new Settings()

const map = new ArxMap()
map.config.offset = new Vector3(6000, 0, 6000)
map.player.position.adjustToPlayerHeight()
map.player.withScript()
if (settings.mode === 'development') {
  map.player.script?.properties.push(new Speed(2))
}
map.hud.hide(HudElements.Minimap)

await map.i18n.addFromFile('./i18n.json', settings)

// ----------------------

const plane = createPlaneMesh({
  size: new Vector2(1000, 1000),
  texture: Texture.uvDebugTexture,
})

const meshes = [plane]

meshes.forEach((mesh) => {
  applyTransformations(mesh)
  mesh.translateX(map.config.offset.x)
  mesh.translateY(map.config.offset.y)
  mesh.translateZ(map.config.offset.z)
  applyTransformations(mesh)
  map.polygons.addThreeJsMesh(mesh, {
    tryToQuadify: QUADIFY,
    shading: SHADING_SMOOTH,
  })
})

// -------------------------

const present1 = new Present({
  position: new Vector3(300, -10, 300),
  variant: 'red',
})

const present2 = new Present({
  position: new Vector3(350, -10, 300),
  variant: 'blue',
})

const hat = new Hat({
  position: new Vector3(200, -100, 250),
})

map.entities.push(present1, present2, hat)

const overheadLight = createLight({
  position: new Vector3(0, -800, 0),
  radius: 2000,
  intensity: 3,
})
map.lights.push(overheadLight)

// ----------------------

xmasTreeMesh[0].geometry.rotateY(MathUtils.degToRad(117))
applyTransformations(xmasTreeMesh[0])
xmasTreeMesh[0].geometry.translate(map.config.offset.x, map.config.offset.y - 200, map.config.offset.z + 200)

map.polygons.addThreeJsMesh(xmasTreeMesh[0], { shading: SHADING_SMOOTH, tryToQuadify: DONT_QUADIFY })

map.polygons.selectByTextures(['pngwing.com.png']).flipUVVertically()

// ----------------------

map.finalize()
await map.saveToDisk(settings)

console.log('done')
