import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'Giftbox',
  yAxisAdjustment: -130,
  internalScale: 0.25,
})

export const createGiftBox = prefab.load.bind(prefab)
