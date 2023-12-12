import { ArxPolygonFlags } from 'arx-convert/types'
import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'coinslot',
  yAxisAdjustment: -100,
  // internalScale: 0.19,
  // flipUVVertically: true,
  // flipPolygonAxisX: true,
  materialFlags: () => {
    return ArxPolygonFlags.None
  },
})

export const createCoinSlot = prefab.load.bind(prefab)
