import path from 'node:path'
import { ArxPolygonFlags } from 'arx-convert/types'
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
import { useDelay } from 'arx-level-generator/scripting/hooks'
import { Label, Speed } from 'arx-level-generator/scripting/properties'
import { createLight } from 'arx-level-generator/tools'
import { loadOBJ } from 'arx-level-generator/tools/mesh'
import { applyTransformations, circleOfVectors, pointToBox } from 'arx-level-generator/utils'
import { Box3, MathUtils, Vector2 } from 'three'
import { createXmasTree } from '@/prefabs/xmasTree.js'
import { objFolder } from './constants.js'
import { Hat } from './entities/hat.js'
import { createCoinSlot } from './prefabs/coinSlot.js'
import { createGarlandLong } from './prefabs/garlandLong.js'
import { createGarlandRound } from './prefabs/garlandRound.js'
import { createGiftBox } from './prefabs/giftBox.js'
import { createPaperWrapRoll } from './prefabs/paperWrapRoll.js'
import { createVendingMachine } from './prefabs/vendingMachine.js'

const settings = new Settings()

// const map = await ArxMap.fromOriginalLevel(2, settings)
const map = new ArxMap()

// const centerOfGoblinMainHall = new Vector3(12450, 1100, 9975)

// const roomIdOfGoblinMainHall = map.polygons.sort((a, b) => {
//   const aDist = a.vertices[0].distanceTo(centerOfGoblinMainHall)
//   const bDist = b.vertices[0].distanceTo(centerOfGoblinMainHall)
//   return aDist - bDist
// })[0].room

// map.entities.empty()

if (settings.mode === 'development') {
  // map.polygons.selectWithinBox(pointToBox(centerOfGoblinMainHall, 2000)).invertSelection().removeSelected()

  map.player.withScript()
  map.player.script?.properties.push(new Speed(2))
  // map.player.script?.on('initend', () => {
  //   return `teleport flee_marker_0041`
  // })
}

await map.i18n.addFromFile('./i18n.json', settings)

// ----------------------

// const plane = createPlaneMesh({
//   size: new Vector2(1000, 1000),
//   texture: new Texture({ filename: 'L1_DRAGON_[ICE]_GROUND05.jpg' }),
// })
// applyTransformations(plane)
// plane.translateX(map.config.offset.x)
// plane.translateY(map.config.offset.y)
// plane.translateZ(map.config.offset.z)
// applyTransformations(plane)
// map.polygons.addThreeJsMesh(plane, { tryToQuadify: QUADIFY, shading: SHADING_FLAT })

// ----------------------

const overheadLights = circleOfVectors(new Vector3(0, -1000, 0), 1000, 3).map((position) => {
  return createLight({
    position,
    radius: 2000,
    intensity: 3,
  })
})
map.lights.push(...overheadLights)

// ----------------------

const { meshes: wallsMeshes } = await loadOBJ(path.join(objFolder, 'walls'), {
  position: new Vector3(-1500, 0, 1500),
  // reversedPolygonWinding: true,
  // materialFlags: ArxPolygonFlags.DoubleSided | ArxPolygonFlags.NoShadow,
  orientation: new Rotation(MathUtils.degToRad(-90), 0, 0),
  fallbackTexture: Texture.l1TempleStoneWall03,
  scale: 0.8,
  scaleUV: 3,
})

// const { meshes: xmasTree } = await createXmasTree({
//   position: new Vector3(0, 0, 500),
//   orientation: new Rotation(0, MathUtils.degToRad(90), 0),
//   scale: 1.15,
// })

/*
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

const { meshes: coinSlot } = await createCoinSlot({
  position: new Vector3(-300, 0, -200),
})
*/

// ---------------------------

// const prefabs = [xmasTree, giftBox, paperWrapRoll, garlandLong, garlandRound, vendingMachine, coinSlot]
const prefabs = [wallsMeshes]

prefabs.flat().forEach((mesh) => {
  applyTransformations(mesh)
  // mesh.translateX(centerOfGoblinMainHall.x)
  // mesh.translateY(centerOfGoblinMainHall.y)
  // mesh.translateZ(centerOfGoblinMainHall.z)
  mesh.translateX(map.config.offset.x)
  mesh.translateY(map.config.offset.y)
  mesh.translateZ(map.config.offset.z)

  applyTransformations(mesh)
  map.polygons.addThreeJsMesh(mesh, {
    tryToQuadify: DONT_QUADIFY,
    shading: SHADING_SMOOTH,
    // room: roomIdOfGoblinMainHall,
  })
})

// ----------------------

const hatOnGoblin = new Hat({
  position: new Vector3(0, 0, 300),
})

const chicken = new Entity({
  src: 'npc/chicken_base',
  id: 1000,
})
chicken.withScript()

const goblin = new Entity({
  src: 'npc/goblin_base',
  id: 1000,
  position: new Vector3(0, 0, 200),
  orientation: new Rotation(0, MathUtils.degToRad(180), 0),
})
goblin.withScript()
goblin.script?.on('initend', () => {
  const { delay } = useDelay()
  return `
    ${new Label('[goblin-name]')}
    setweapon none
    TWEAK HEAD "goblin_nohelm"
    attach ${hatOnGoblin.ref} view_attach self view_attach
    ${delay(100)} attach ${chicken.ref} view_attach self left_attach
    setspeed 0.01
  `
})

const door = new LightDoor({
  position: new Vector3(410, 0, -300),
  orientation: new Rotation(0, MathUtils.degToRad(180), 0),
})

const hatOnFloor = new Hat({
  position: new Vector3(200, 0, 300),
})

map.entities.push(hatOnGoblin, chicken, goblin, door, hatOnFloor)

// ----------------------

map.finalize()
await map.saveToDisk(settings)

console.log('done')
