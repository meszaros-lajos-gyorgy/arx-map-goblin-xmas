import { Expand } from 'arx-convert/utils'
import { Entity, EntityConstructorPropsWithoutSrc, EntityModel, Rotation, Texture } from 'arx-level-generator'
import { Shadow } from 'arx-level-generator/scripting/properties'
import { BufferGeometry } from 'three'
import { createHat } from '@/prefabs/hat.js'

type HatConstructorProps = Expand<
  EntityConstructorPropsWithoutSrc & {
    // TODO
  }
>

const { meshes, materials } = await createHat({
  scale: 0.8,
})

const getNumberOfVertices = (geometry: BufferGeometry) => {
  return geometry.getAttribute('position').array.length / 3 - 1
}

export class Hat extends Entity {
  constructor({ ...props }: HatConstructorProps = {}) {
    super({
      src: 'items/armor/hat',
      inventoryIcon: Texture.fromCustomFile({
        filename: 'hat.bmp',
        sourcePath: './2d icons/',
      }),
      model: EntityModel.fromThreeJsObj(meshes[0], {
        filename: 'hat.ftl',
        originIdx: getNumberOfVertices(meshes[0].geometry) - 1,
        actionPoints: [
          {
            name: 'view_attach',
            vertexIdx: getNumberOfVertices(meshes[0].geometry),
            action: -1,
            sfx: -1,
          },
        ],
      }),
      otherDependencies: materials,
      ...props,
    })

    this.withScript()

    this.script?.appendRaw(`
ON INIT {
  setname "christmas cap"
  SET_MATERIAL CLOTH
  SET_ARMOR_MATERIAL LEATHER
  SET_GROUP ARMORY
  SETPLAYERTWEAK MESH "human_leather_Black.teo"
  SETOBJECTTYPE HELMET
  SETEQUIP armor_class 2
  SETEQUIP defense 2
  SET_DURABILITY 100
  ${Shadow.off}
  ACCEPT
}

ON INVENTORYUSE {
  EQUIP PLAYER
  ACCEPT
}

ON EQUIPIN {
  PLAY "equip_armor"
  ACCEPT
}
    `)
  }
}
