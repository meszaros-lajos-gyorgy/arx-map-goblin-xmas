// xmastree

/*
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
      flags: ArxPolygonFlags.None,
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
      flags: ArxPolygonFlags.None,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'pngwing.com.png',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.DoubleSided | ArxPolygonFlags.Tiled,
    },
  ),
  Material.fromTexture(
    Texture.fromCustomFile({
      filename: 'red.jpg',
      sourcePath: './export_textures/',
    }),
    {
      flags: ArxPolygonFlags.None,
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
      flags: ArxPolygonFlags.None,
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

export const xmasTreeMesh = await loadOBJ('xmastree', {
  materialFlags: (t) => {
    if (
      t.filename.startsWith('red.') ||
      t.filename.startsWith('blue.') ||
      t.filename.startsWith('yellow.') ||
      t.filename.startsWith('pink.')
    ) {
      return ArxPolygonFlags.None
    }

    if (t.filename.startsWith('pngwing')) {
      return ArxPolygonFlags.DoubleSided | ArxPolygonFlags.Tiled
    }

    return ArxPolygonFlags.Tiled
  },
  scale: 0.5,
})
*/
