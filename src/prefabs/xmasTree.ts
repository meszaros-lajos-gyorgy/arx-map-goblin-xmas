import { Prefab } from '@/Prefab.js'

const xmasTreeLoader = new Prefab({
  filenameWithoutExtension: 'xmastree',
  yAxisAdjustment: -320,
  flipUVVertically: true,
  internalScale: 0.5,
})

export const createXmasTree = xmasTreeLoader.load.bind(xmasTreeLoader)
