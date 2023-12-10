import { Prefab } from '@/Prefab.js'

const paperWrapRollLoader = new Prefab({
  filenameWithoutExtension: 'paperwrap_roll',
  yAxisAdjustment: -30,
  internalScale: 0.25,
})

export const createPaperWrapRoll = paperWrapRollLoader.load.bind(paperWrapRollLoader)
