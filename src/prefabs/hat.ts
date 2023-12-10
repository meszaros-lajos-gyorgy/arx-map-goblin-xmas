import { Prefab } from '@/Prefab.js'

const hatLoader = new Prefab({
  filenameWithoutExtension: 'Hat',
  yAxisAdjustment: -130,
  internalScale: 0.11,
})

export const createHat = hatLoader.load.bind(hatLoader)
