import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'garland_long',
  internalScale: 0.2,
  flipPolygonAxisX: true,
})

export const createGarlandLong = prefab.load.bind(prefab)
