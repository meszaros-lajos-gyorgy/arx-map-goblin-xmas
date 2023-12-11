// import { getNonIndexedVertices } from 'arx-level-generator/tools/mesh'
import { Prefab, PrefabLoadProps } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'Hat',
  yAxisAdjustment: -130,
  internalScale: 0.09,
})

export const createHat = async (props: PrefabLoadProps) => {
  const { meshes, materials } = await prefab.load(props)

  // const vertices = getNonIndexedVertices(meshes[0].geometry)
  // console.log(vertices)

  return { meshes, materials }
}
