import { DoubleOf, TripleOf } from 'arx-convert/utils'
import { Texture } from 'arx-level-generator'
import { toArxCoordinateSystem } from 'arx-level-generator/tools/mesh'
import { BufferAttribute, BufferGeometry, Mesh, MeshBasicMaterial } from 'three'
import { Prefab, PrefabLoadProps } from '@/Prefab.js'

const prefab = new Prefab({
  filenameWithoutExtension: 'Hat',
  yAxisAdjustment: -130,
  internalScale: 0.09,
})

export const createHat = async (props: PrefabLoadProps) => {
  const { meshes, materials } = await prefab.load(props)

  // -------------------------

  const _geometry = meshes[0].geometry

  const index = _geometry.getIndex()
  const _position = _geometry.getAttribute('position') as BufferAttribute
  const _normals = _geometry.getAttribute('normal') as BufferAttribute
  const _uvs = _geometry.getAttribute('uv') as BufferAttribute

  const vertices: { pos: TripleOf<number>; norm: TripleOf<number>; uv: DoubleOf<number> }[] = []

  if (index === null) {
    // non-indexed geometry, all vertices are unique
    for (let idx = 0; idx < _position.count; idx++) {
      vertices.push({
        pos: [_position.getX(idx), _position.getY(idx), _position.getZ(idx)],
        norm: [_normals.getX(idx), _normals.getY(idx), _normals.getZ(idx)],
        uv: [_uvs.getX(idx), _uvs.getY(idx)],
      })
    }
  } else {
    // indexed geometry, has shared vertices
    for (let i = 0; i < index.count; i++) {
      const idx = index.getX(i)
      vertices.push({
        pos: [_position.getX(idx), _position.getY(idx), _position.getZ(idx)],
        norm: [_normals.getX(idx), _normals.getY(idx), _normals.getZ(idx)],
        uv: [_uvs.getX(idx), _uvs.getY(idx)],
      })
    }
  }

  // -------------------------

  const positions = []
  const normals = []
  const uvs = []
  for (const vertex of vertices) {
    positions.push(...vertex.pos)
    normals.push(...vertex.norm)
    uvs.push(...vertex.uv)
  }

  // -------------------------

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(positions), 3))
  geometry.setAttribute('normal', new BufferAttribute(new Float32Array(normals), 3))
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array(uvs), 2))

  geometry.scale(5, 5, 5)

  const _meshes = [
    new Mesh(
      geometry,
      new MeshBasicMaterial({
        map: Texture.l3DissidStoneTrans01,
      }),
    ),
  ]

  // -------------------------

  return { meshes: _meshes, materials }
}
