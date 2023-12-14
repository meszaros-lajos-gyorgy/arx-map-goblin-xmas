import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'paperwrap_roll',
  internalScale: 0.25,
})

export const createPaperWrapRoll = prefab.load.bind(prefab)
