import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'xmas_tree',
  flipUVVertically: true,
  internalScale: 0.5,
})

export const createXmasTree = prefab.load.bind(prefab)
