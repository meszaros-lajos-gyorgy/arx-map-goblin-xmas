import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'garland_round',
  yAxisAdjustment: -325,
  internalScale: 0.1,
  flipPolygonAxisX: true,
})

export const createGarlandRound = prefab.load.bind(prefab)
