import { ArxPolygonFlags } from 'arx-convert/types'
import { Expand } from 'arx-convert/utils'
import { Entity, EntityConstructorPropsWithoutSrc, EntityModel, Material, Texture } from 'arx-level-generator'
import { Shadow } from 'arx-level-generator/scripting/properties'
import { loadOBJ } from 'arx-level-generator/tools/mesh'

type TreeConstructorProps = Expand<
  EntityConstructorPropsWithoutSrc & {
    variant: 'blue' | 'red'
  }
>

const textures = [
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'wrap1.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'wrap2.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'blue_ribbon.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
]

export const redBox = await loadOBJ('redboxobj', {
  materialFlags: ArxPolygonFlags.Tiled,
  scale: 0.2,
})

export const blueBox = await loadOBJ('blueboxobj', {
  materialFlags: ArxPolygonFlags.Tiled,
  scale: 0.2,
})

export class Present extends Entity {
  constructor({ variant, ...props }: TreeConstructorProps) {
    super({
      src: 'items/provisions/present-' + variant,
      inventoryIcon: Texture.fromCustomFile({
        filename: 'present[icon].bmp',
        sourcePath: '.',
      }),
      model: EntityModel.fromThreeJsObj(variant === 'blue' ? blueBox[0] : redBox[0], {
        filename: 'present-' + variant + '.ftl',
        originIdx: variant === 'blue' ? 0 : 80,
      }),
      otherDependencies: textures,
      ...props,
    })

    this.withScript()

    this.script?.properties.push(Shadow.off)
  }
}
