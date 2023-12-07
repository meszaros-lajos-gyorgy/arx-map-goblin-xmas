import { Expand } from 'arx-convert/utils'
import { Entity, EntityConstructorPropsWithoutSrc, EntityModel, Rotation, Texture } from 'arx-level-generator'
import { Shadow } from 'arx-level-generator/scripting/properties'
import { MathUtils } from 'three'
import { createHat, hatTextures } from '@/prefabs/hat.js'

type HatConstructorProps = Expand<
  EntityConstructorPropsWithoutSrc & {
    // TODO
  }
>

const hatMesh = await createHat({
  orientation: new Rotation(0, MathUtils.degToRad(180), 0),
  scale: 0.8,
})

export class Hat extends Entity {
  constructor({ ...props }: HatConstructorProps = {}) {
    super({
      src: 'items/armor/hat',
      inventoryIcon: Texture.fromCustomFile({
        filename: 'hat.bmp',
        sourcePath: './2d icons/',
      }),
      model: EntityModel.fromThreeJsObj(hatMesh[0], {
        filename: 'hat.ftl',
        originIdx: 871,
        actionPoints: [{ name: 'bottom', vertexIdx: 1001, action: -1, sfx: -1 }],
      }),
      otherDependencies: hatTextures,
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
