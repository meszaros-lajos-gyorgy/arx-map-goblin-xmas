import { Vector3 } from 'arx-level-generator'
import { Prefab, PrefabLoadProps } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'vending_machine',
  yAxisAdjustment: -600,
  internalScale: 0.2,
  flipUVVertically: true,
  materialFlags: (texture, defaultFlags) => {
    if (texture.filename === '05glass.jpg') {
      texture.filename = '05GlassCola.jpg'
    }

    return defaultFlags
  },
})

export const createVendingMachine = async ({
  position = new Vector3(0, 0, 0),
  scale = 1,
  orientation,
  ...props
}: PrefabLoadProps) => {
  const { meshes, materials } = await prefab.load(props)

  meshes.forEach((mesh) => {
    mesh.geometry.scale(-1, 1, 1)

    if (orientation) {
      mesh.geometry.rotateX(orientation.x)
      mesh.geometry.rotateY(orientation.y)
      mesh.geometry.rotateZ(orientation.z)
    }

    mesh.geometry.translate(position.x * scale, position.y * scale, position.z * scale)
  })

  return { meshes, materials }
}
