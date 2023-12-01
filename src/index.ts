import {
  ArxMap,
  DONT_QUADIFY,
  Entity,
  HudElements,
  Rotation,
  SHADING_SMOOTH,
  Settings,
  Texture,
  Vector3,
} from 'arx-level-generator'
import { createPlaneMesh } from 'arx-level-generator/prefabs/mesh'
import { Interactivity, Shadow, Speed } from 'arx-level-generator/scripting/properties'
import { applyTransformations } from 'arx-level-generator/utils'
import { Vector2 } from 'three'

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
  texture: Texture.aliciaRoomMur01,
})

const meshes = [plane]

meshes.forEach((mesh) => {
  applyTransformations(mesh)
  mesh.translateX(map.config.offset.x)
  mesh.translateY(map.config.offset.y)
  mesh.translateZ(map.config.offset.z)
  applyTransformations(mesh)
  map.polygons.addThreeJsMesh(mesh, {
    tryToQuadify: DONT_QUADIFY,
    shading: SHADING_SMOOTH,
  })
})

// ----------------------

map.finalize()
await map.saveToDisk(settings)

console.log('done')
