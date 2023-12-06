import {
  ArxMap,
  DONT_QUADIFY,
  HudElements,
  QUADIFY,
  Rotation,
  SHADING_SMOOTH,
  Settings,
  Texture,
  Vector3,
} from 'arx-level-generator'
import { createPlaneMesh } from 'arx-level-generator/prefabs/mesh'
import { Speed } from 'arx-level-generator/scripting/properties'
import { createLight } from 'arx-level-generator/tools'
import { applyTransformations, circleOfVectors } from 'arx-level-generator/utils'
import { MathUtils, Vector2 } from 'three'
import { createXmasTree } from './prefabs/xmasTree.js'

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

const plane = createPlaneMesh({ size: new Vector2(1000, 1000), texture: Texture.uvDebugTexture })
applyTransformations(plane)
plane.translateX(map.config.offset.x)
plane.translateY(map.config.offset.y)
plane.translateZ(map.config.offset.z)
applyTransformations(plane)
map.polygons.addThreeJsMesh(plane, { tryToQuadify: QUADIFY, shading: SHADING_SMOOTH })

// ----------------------

const overheadLights = circleOfVectors(new Vector3(0, -800, 0), 300, 3).map((position) => {
  return createLight({
    position,
    radius: 2000,
    intensity: 3,
  })
})
map.lights.push(...overheadLights)

// ----------------------

const xmasTree = await createXmasTree({
  position: new Vector3(0, 0, 300),
  orientation: new Rotation(0, MathUtils.degToRad(90), 0),
})
xmasTree.forEach((mesh) => {
  applyTransformations(mesh)
  mesh.translateX(map.config.offset.x)
  mesh.translateY(map.config.offset.y)
  mesh.translateZ(map.config.offset.z)
  applyTransformations(mesh)
  map.polygons.addThreeJsMesh(mesh, { tryToQuadify: DONT_QUADIFY, shading: SHADING_SMOOTH })
})

// ----------------------

map.finalize()
await map.saveToDisk(settings)

console.log('done')
