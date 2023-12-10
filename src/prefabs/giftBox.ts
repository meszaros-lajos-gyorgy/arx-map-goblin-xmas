import { Prefab } from '@/Prefab.js'

const giftBoxLoader = new Prefab({
  filenameWithoutExtension: 'Giftbox',
  yAxisAdjustment: -130,
  internalScale: 0.25,
})

export const createGiftBox = giftBoxLoader.load.bind(giftBoxLoader)
