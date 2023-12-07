import { ArxPolygonFlags } from 'arx-convert/types'
import { Rotation, Vector3 } from 'arx-level-generator'
import { loadOBJ } from 'arx-level-generator/tools/mesh'
import { Vector2 } from 'three'

type createXmasTreeProps = {
  position?: Vector3
  orientation?: Rotation
  scale?: number
}

export const createXmasTree = async ({
  position = new Vector3(0, 0, 0),
  orientation,
  scale = 1,
}: createXmasTreeProps = {}) => {
  const mesh = await loadOBJ('./3d models + textures/xmastree', {
    position: position.clone().add(new Vector3(0, -300 * scale, 0)),
    scale,
    scaleUV: new Vector2(1, -1),
    orientation,
    materialFlags: (texture) => {
      texture.sourcePath = './3d models + textures/Texture/'
      return ArxPolygonFlags.DoubleSided | ArxPolygonFlags.Tiled
    },
  })

  return mesh
}
