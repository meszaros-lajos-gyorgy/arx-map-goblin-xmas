import { ArxPolygonFlags } from 'arx-convert/types'
import { Expand } from 'arx-convert/utils'
import { Entity, EntityConstructorPropsWithoutSrc, EntityModel, Material, Texture } from 'arx-level-generator'
import { Shadow } from 'arx-level-generator/scripting/properties'
import { loadOBJ } from 'arx-level-generator/tools/mesh'

type HatConstructorProps = Expand<
  EntityConstructorPropsWithoutSrc & {
    // TODO
  }
>

const textures = [
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'whitefluff.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'redfluff.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
]

const hatMesh = await loadOBJ('hat', {
  materialFlags: ArxPolygonFlags.Tiled,
  scale: 0.2,
})

export class Hat extends Entity {
  constructor({ ...props }: HatConstructorProps) {
    super({
      src: 'items/provisions/hat',
      inventoryIcon: Texture.fromCustomFile({
        filename: 'present[icon].bmp',
        sourcePath: '.',
      }),
      model: EntityModel.fromThreeJsObj(hatMesh[0], {
        filename: 'hat.ftl',
        originIdx: 0,
      }),
      otherDependencies: textures,
      ...props,
    })

    this.withScript()

    this.script?.properties.push(Shadow.off)
  }
}
