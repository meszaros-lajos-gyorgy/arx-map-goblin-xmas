import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'xmastree',
  flipUVVertically: true,
  internalScale: 0.5,
})

export const createXmasTree = prefab.load.bind(prefab)
