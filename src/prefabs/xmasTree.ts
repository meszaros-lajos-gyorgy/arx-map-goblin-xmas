import { Prefab } from '@/Prefab.js'

const xmasTreeLoader = new Prefab({
  filenameWithoutExtension: 'xmastree',
  yAxisAdjustment: -300,
  flipUVVertically: true,
})

export const createXmasTree = xmasTreeLoader.load.bind(xmasTreeLoader)
