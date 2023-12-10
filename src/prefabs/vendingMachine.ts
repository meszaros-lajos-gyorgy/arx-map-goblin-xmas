import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'vending_machine',
  yAxisAdjustment: -600,
  internalScale: 0.2,
  flipUVVertically: true,
  flipUVHorizontally: true,
})

export const createVendingMachine = prefab.load.bind(prefab)
