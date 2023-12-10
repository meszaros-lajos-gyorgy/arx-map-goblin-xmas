import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'xmastree',
  yAxisAdjustment: -320,
  flipUVVertically: true,
  internalScale: 0.5,
})

export const createXmasTree = prefab.load.bind(prefab)
