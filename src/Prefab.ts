import path from 'node:path'
import { Rotation, Vector3 } from 'arx-level-generator'
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
  internalScale?: number
  /**
   * default value is 0
   */
  yAxisAdjustment?: number
  /**
   * default value is false
   */
  flipUVVertically?: boolean
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
  internalScale: number
  yAxisAdjustment: number
  flipUVVertically: boolean

  constructor({
    filenameWithoutExtension,
    objFolder = defaultObjFolder,
    textureFolder = defaultTextureFolder,
    internalScale = 1,
    yAxisAdjustment = 0,
    flipUVVertically = false,
  }: PrefabConstructorProps) {
    this.filenameWithoutExtension = filenameWithoutExtension
    this.objFolder = objFolder
    this.textureFolder = textureFolder
    this.internalScale = internalScale
    this.yAxisAdjustment = yAxisAdjustment
    this.flipUVVertically = flipUVVertically
  }

  async load({ position = new Vector3(0, 0, 0), orientation, scale: rawScale = 1 }: PrefabLoadProps = {}) {
    const scale = this.internalScale * rawScale

    return loadOBJ(path.join(this.objFolder, this.filenameWithoutExtension), {
      position: position.clone().add(new Vector3(0, this.yAxisAdjustment * scale, 0)),
      scale,
      ...(this.flipUVVertically ? { scaleUV: new Vector2(1, -1) } : {}),
      orientation,
      materialFlags: (texture, flags) => {
        if (!texture.isInternalAsset) {
          texture.sourcePath = this.textureFolder
        }
        return flags
      },
    })
  }
}
