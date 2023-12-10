import { Prefab } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'vending_machine',
  yAxisAdjustment: -600,
  internalScale: 0.2,
  flipUVVertically: true,
  flipUVHorizontally: true,
  materialFlags: (texture, defaultFlags) => {
    if (texture.filename === '05glass.jpg') {
      texture.filename = '05GlassCola.jpg'
    }

    return defaultFlags
  },
})

export const createVendingMachine = prefab.load.bind(prefab)
