import { ArxMap, DONT_QUADIFY, HudElements, SHADING_SMOOTH, Settings, Texture, Vector3 } from 'arx-level-generator'
import { createPlaneMesh } from 'arx-level-generator/prefabs/mesh'
import { Speed } from 'arx-level-generator/scripting/properties'
import { createLight } from 'arx-level-generator/tools'
import { applyTransformations } from 'arx-level-generator/utils'
import { Vector2 } from 'three'
import { Hat } from './entities/hat.js'
import { Present } from './entities/present.js'
import { XmasTree } from './entities/xmasTree.js'

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

const present1 = new Present({
  position: new Vector3(100, -10, 300),
  variant: 'red',
})

const present2 = new Present({
  position: new Vector3(150, -10, 300),
  variant: 'blue',
})

const hat = new Hat({
  position: new Vector3(0, -100, 250),
})

const xmasTree = new XmasTree({
  position: new Vector3(400, -100, 250),
})

map.entities.push(present1, present2, hat, xmasTree)

const overheadLight = createLight({
  position: new Vector3(0, -500, 0),
  radius: 1000,
})
map.lights.push(overheadLight)

// ----------------------

map.finalize()
await map.saveToDisk(settings)

console.log('done')
