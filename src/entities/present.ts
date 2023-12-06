/*
import { ArxPolygonFlags } from 'arx-convert/types'
import { Expand } from 'arx-convert/utils'
import { Entity, EntityConstructorPropsWithoutSrc, EntityModel, Material, Texture } from 'arx-level-generator'
import { Shadow } from 'arx-level-generator/scripting/properties'
import { loadOBJ } from 'arx-level-generator/tools/mesh'

type PresentConstructorProps = Expand<
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

const presentMesh = await loadOBJ('redbox', {
  materialFlags: ArxPolygonFlags.Tiled,
  scale: 0.2,
})

export class Present extends Entity {
  constructor({ variant, ...props }: PresentConstructorProps) {
    super({
      src: 'items/provisions/present',
      inventoryIcon: Texture.fromCustomFile({
        filename: 'present[icon].bmp',
        sourcePath: '.',
      }),
      model: EntityModel.fromThreeJsObj(presentMesh[0], {
        filename: 'present_.ftl',
        originIdx: 80,
      }),
      otherDependencies: textures,
      ...props,
    })

    this.withScript()

    this.script?.properties.push(Shadow.off)

    this.script?.on('init', () => {
      if (variant === 'blue') {
        return 'tweak skin "tileable-wrap1" "tileable-wrap2"'
      }

      return ''
    })
  }
}
*/
