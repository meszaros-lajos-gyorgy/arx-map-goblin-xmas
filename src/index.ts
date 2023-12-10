import {
  ArxMap,
  DONT_QUADIFY,
  Entity,
  HudElements,
  QUADIFY,
  Rotation,
  SHADING_FLAT,
  SHADING_SMOOTH,
  Settings,
  Texture,
  Vector3,
} from 'arx-level-generator'
import { LightDoor } from 'arx-level-generator/prefabs/entity'
import { createPlaneMesh } from 'arx-level-generator/prefabs/mesh'
import { Speed } from 'arx-level-generator/scripting/properties'
import { createLight } from 'arx-level-generator/tools'
import { applyTransformations, circleOfVectors } from 'arx-level-generator/utils'
import { MathUtils, Vector2 } from 'three'
import { createXmasTree } from '@/prefabs/xmasTree.js'
import { Hat } from './entities/hat.js'
import { createGarlandLong } from './prefabs/garlandLong.js'
import { createGarlandRound } from './prefabs/garlandRound.js'
import { createGiftBox } from './prefabs/giftBox.js'
import { createPaperWrapRoll } from './prefabs/paperWrapRoll.js'
import { createVendingMachine } from './prefabs/vendingMachine.js'

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
  texture: new Texture({ filename: 'L1_DRAGON_[ICE]_GROUND05.jpg' }),
})
applyTransformations(plane)
plane.translateX(map.config.offset.x)
plane.translateY(map.config.offset.y)
plane.translateZ(map.config.offset.z)
applyTransformations(plane)
map.polygons.addThreeJsMesh(plane, { tryToQuadify: QUADIFY, shading: SHADING_FLAT })

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

const { meshes: xmasTree } = await createXmasTree({
  position: new Vector3(-300, 0, 300),
  orientation: new Rotation(0, MathUtils.degToRad(90), 0),
})

const { meshes: giftBox } = await createGiftBox({
  position: new Vector3(300, 0, 250),
})

const { meshes: paperWrapRoll } = await createPaperWrapRoll({
  position: new Vector3(300, 0, 100),
})

const { meshes: garlandLong } = await createGarlandLong({
  position: new Vector3(400, -100, 0),
})

const { meshes: garlandRound } = await createGarlandRound({
  position: new Vector3(400, -100, -225),
})

const { meshes: vendingMachine } = await createVendingMachine({
  position: new Vector3(-300, 0, 0),
  orientation: new Rotation(0, MathUtils.degToRad(180), 0),
})

const prefabs = [xmasTree, giftBox, paperWrapRoll, garlandLong, garlandRound, vendingMachine]

prefabs.flat().forEach((mesh) => {
  applyTransformations(mesh)
  mesh.translateX(map.config.offset.x)
  mesh.translateY(map.config.offset.y)
  mesh.translateZ(map.config.offset.z)
  applyTransformations(mesh)
  map.polygons.addThreeJsMesh(mesh, { tryToQuadify: DONT_QUADIFY, shading: SHADING_SMOOTH })
})

// ----------------------

const hat = new Hat({
  position: new Vector3(0, 0, 300),
})

const goblin = new Entity({
  src: 'npc/goblin_base/',
  id: 1000,
  position: new Vector3(0, 0, 200),
  orientation: new Rotation(0, MathUtils.degToRad(180), 0),
})
goblin.withScript()
goblin.script?.on('initend', () => {
  return `
    TWEAK HEAD "goblin_nohelm"
    setweapon none
    attach ${hat.ref} "bottom" self "view_attach"
  `
})

const door = new LightDoor({
  position: new Vector3(410, 0, -300),
  orientation: new Rotation(0, MathUtils.degToRad(180), 0),
})

map.entities.push(goblin, hat, door)

// ----------------------

map.finalize()
await map.saveToDisk(settings)

console.log('done')
