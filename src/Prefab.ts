import path from 'node:path'
import { ArxPolygonFlags } from 'arx-convert/types'
import { Rotation, Texture, Vector3 } from 'arx-level-generator'
import { loadOBJ } from 'arx-level-generator/tools/mesh'
import { Vector2 } from 'three'
import { objFolder as defaultObjFolder, textureFolder as defaultTextureFolder } from '@/constants.js'

export type PrefabConstructorProps = {
  filenameWithoutExtension: string
  /**
   * default value is objFolder from constants.ts
   */
  objFolder?: string
  /**
   * default value is textureFolder from constants.ts
   */
  textureFolder?: string
  /**
   * default value is 1
   */
  internalScale?: number | Vector3
  /**
   * default value is 0
   */
  yAxisAdjustment?: number
  /**
   * default value is false
   */
  flipUVVertically?: boolean
  /**
   * default value is false
   */
  flipUVHorizontally?: boolean

  /**
   * default value is false
   */
  flipPolygonAxisX?: boolean
  /**
   * default value is false
   */
  flipPolygonAxisY?: boolean
  /**
   * default value is false
   */
  flipPolygonAxisZ?: boolean
  materialFlags?: (texture: Texture, defaultFlags: ArxPolygonFlags) => ArxPolygonFlags
}

export type PrefabLoadProps = {
  position?: Vector3
  orientation?: Rotation
  scale?: number
}

export class Prefab {
  filenameWithoutExtension: string
  objFolder: string
  textureFolder: string
  internalScale: Vector3
  internalScaleUV: Vector2
  yAxisAdjustment: number
  materialFlags: ((texture: Texture, defaultFlags: ArxPolygonFlags) => ArxPolygonFlags) | undefined

  constructor({
    filenameWithoutExtension,
    objFolder = defaultObjFolder,
    textureFolder = defaultTextureFolder,
    internalScale = 1,
    yAxisAdjustment = 0,
    flipUVVertically = false,
    flipUVHorizontally = false,
    flipPolygonAxisX = false,
    flipPolygonAxisY = false,
    flipPolygonAxisZ = false,
    materialFlags,
  }: PrefabConstructorProps) {
    this.filenameWithoutExtension = filenameWithoutExtension
    this.objFolder = objFolder
    this.textureFolder = textureFolder

    if (typeof internalScale === 'number') {
      this.internalScale = new Vector3(internalScale, internalScale, internalScale)
    } else {
      this.internalScale = internalScale.clone()
    }
    this.internalScale.multiply(
      new Vector3(flipPolygonAxisX ? -1 : 1, flipPolygonAxisY ? -1 : 1, flipPolygonAxisZ ? -1 : 1),
    )

    this.internalScaleUV = new Vector2(flipUVHorizontally ? -1 : 1, flipUVVertically ? -1 : 1)

    this.yAxisAdjustment = yAxisAdjustment
    this.materialFlags = materialFlags
  }

  async load({ position = new Vector3(0, 0, 0), orientation, scale: rawScale = 1 }: PrefabLoadProps = {}) {
    const scale = this.internalScale.multiplyScalar(rawScale)

    return loadOBJ(path.join(this.objFolder, this.filenameWithoutExtension), {
      position: position.clone().add(new Vector3(0 * scale.x, this.yAxisAdjustment * scale.y, 0 * scale.z)),
      scale,
      scaleUV: this.internalScaleUV,
      orientation,
      materialFlags: (texture, flags) => {
        if (!texture.isInternalAsset) {
          texture.sourcePath = this.textureFolder
        }
        if (this.materialFlags) {
          return this.materialFlags(texture, flags)
        } else {
          return flags
        }
      },
    })
  }
}
