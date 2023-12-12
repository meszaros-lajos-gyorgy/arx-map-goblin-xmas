import { Texture, Vector3 } from 'arx-level-generator'
import { circleOfVectors } from 'arx-level-generator/utils'
import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Prefab, PrefabLoadProps } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'Hat',
  yAxisAdjustment: -130,
  internalScale: 0.08,
})

export const createHat = async (props: PrefabLoadProps) => {
  const { meshes: _meshes, materials } = await prefab.load(props)

  // -------------------------

  const alphaMaterial = new MeshBasicMaterial({ map: Texture.alpha })

  // adds a polygon to the model which could be used as an attachment point later

  const attachmentPoint = new Vector3(180, 50, -63)
  const meshes = _meshes.map(({ material, geometry: _geometry }) => {
    const materials = Array.isArray(material) ? material : [material]

    const positions = [..._geometry.getAttribute('position').array]
    const normals = [..._geometry.getAttribute('normal').array]
    const uvs = [..._geometry.getAttribute('uv').array]
    const groups = [..._geometry.groups]

    const numberOfPolygons = positions.length
    const numberOfMaterials = materials.length

    // ---------

    attachmentPoint.multiply(prefab.internalScale)

    circleOfVectors(attachmentPoint, 1, 3).forEach((point) => {
      positions.push(point.x, point.y, point.z)
      normals.push(0, -1, 0)
      uvs.push(point.x - attachmentPoint.x, point.z - attachmentPoint.z)
    })

    groups.push({ start: numberOfPolygons, count: 1, materialIndex: numberOfMaterials })

    materials.push(alphaMaterial)

    // ---------

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3))
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))

    groups.forEach(({ start, count, materialIndex }) => {
      geometry.addGroup(start, count, materialIndex)
    })

    return new Mesh(geometry, materials)
  })

  // -------------------------

  return { meshes, materials }
}
