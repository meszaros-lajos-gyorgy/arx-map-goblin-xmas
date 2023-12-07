import { ArxPolygonFlags } from 'arx-convert/types'
import { Rotation, Texture, Vector3 } from 'arx-level-generator'
import { loadOBJ } from 'arx-level-generator/tools/mesh'

type createHatProps = {
  position?: Vector3
  orientation?: Rotation
  scale?: number
}

export let hatTextures: Texture[] = []

export const createHat = async ({
  position = new Vector3(0, 0, 0),
  orientation,
  scale: rawScale = 1,
}: createHatProps = {}) => {
  const scale = 0.1 * rawScale

  hatTextures = []

  const mesh = await loadOBJ('./3d models + textures/Hat', {
    position: position.clone().add(new Vector3(0, -130 * scale, 0)),
    scale,
    orientation,
    materialFlags: (texture) => {
      if (!texture.isInternalAsset) {
        texture.sourcePath = './3d models + textures/Texture/'
      }
      hatTextures.push(texture)
      return ArxPolygonFlags.DoubleSided | ArxPolygonFlags.Tiled
    },
  })
  return mesh
}
