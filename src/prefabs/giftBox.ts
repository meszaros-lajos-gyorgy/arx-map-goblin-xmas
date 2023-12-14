import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'Giftbox',
  internalScale: 0.25,
})

export const createGiftBox = prefab.load.bind(prefab)
