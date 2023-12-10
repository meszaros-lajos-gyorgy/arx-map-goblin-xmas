import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'Hat',
  yAxisAdjustment: -130,
  internalScale: 0.11,
})

export const createHat = prefab.load.bind(prefab)
