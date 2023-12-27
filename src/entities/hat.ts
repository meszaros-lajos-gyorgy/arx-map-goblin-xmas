import { Expand } from 'arx-convert/utils'
import { Entity, EntityConstructorPropsWithoutSrc, EntityModel, Rotation, Texture } from 'arx-level-generator'
import { Sound, SoundFlags } from 'arx-level-generator/scripting/classes'
import { Label, Material, Shadow } from 'arx-level-generator/scripting/properties'
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

    const equipArmorSound = new Sound('equip_armor', SoundFlags.None)

    this.script?.appendRaw(`
on init {
  ${new Label('christmas cap')}
  ${new Material('cloth')}
  
  set_armor_material leather
  set_group armory
  setplayertweak mesh "human_leather_Black.teo"
  setobjecttype helmet
  setequip armor_class 2
  setequip defense 2
  set_durability 100
  ${Shadow.off}
  accept
}

on inventoryuse {
  equip player
  accept
}

on equipin {
  ${equipArmorSound.play()}
  accept
}
    `)
  }
}
