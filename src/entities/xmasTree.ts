import { ArxPolygonFlags } from 'arx-convert/types'
import { Expand } from 'arx-convert/utils'
import { Entity, EntityConstructorPropsWithoutSrc, EntityModel, Material, Texture } from 'arx-level-generator'
import { Shadow } from 'arx-level-generator/scripting/properties'
import { loadOBJ } from 'arx-level-generator/tools/mesh'

type XmasTreeConstructorProps = Expand<
  EntityConstructorPropsWithoutSrc & {
    // TODO
  }
>

const textures = [
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'bark.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'blue.png',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'redboa.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'pink.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'pngwing.com.png',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'red.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'red_glitter.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'yellow.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.Tiled,
    },
  ),

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

const xmasTreeMesh = await loadOBJ('xmastree', {
  materialFlags: ArxPolygonFlags.Tiled,
  scale: 0.2,
})

export class XmasTree extends Entity {
  constructor({ ...props }: XmasTreeConstructorProps) {
    super({
      src: 'fix_inter/xmas_tree',
      model: EntityModel.fromThreeJsObj(xmasTreeMesh[0], {
        filename: 'xmas_tree.ftl',
        originIdx: 0,
      }),
      otherDependencies: textures,
      ...props,
    })

    this.withScript()

    this.script?.properties.push(Shadow.off)
  }
}
