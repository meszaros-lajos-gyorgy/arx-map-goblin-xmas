import { Rotation, Vector3 } from 'arx-level-generator'
import { addPoint } from 'arx-level-generator/tools/mesh'
import { MathUtils } from 'three'
import { Prefab, PrefabLoadProps } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'hat',
  internalScale: 0.08,
})

export const createHat = async ({ orientation, position, scale: _scale = 1 }: PrefabLoadProps) => {
  const internalOrientation = new Rotation(0, MathUtils.degToRad(30), MathUtils.degToRad(-20))

  const { meshes: _meshes, materials } = await prefab.load({ scale: _scale, orientation: internalOrientation })

  const meshes = _meshes.map((mesh) => {
    if (typeof orientation !== 'undefined') {
      mesh.geometry.rotateX(orientation.x)
      mesh.geometry.rotateY(orientation.y)
      mesh.geometry.rotateZ(orientation.z)
    }

    const scale = prefab.internalScale.multiplyScalar(_scale)

    const origin = new Vector3(0, 0, 0)
    const viewAttach = new Vector3(235, 50, 10)

    const newMesh = addPoint(viewAttach.multiply(scale), addPoint(origin.multiply(scale), mesh))

    if (typeof position !== 'undefined') {
      newMesh.geometry.translate(position.x, position.y, position.z)
    }

    return newMesh
  })

  return { meshes, materials }
}
