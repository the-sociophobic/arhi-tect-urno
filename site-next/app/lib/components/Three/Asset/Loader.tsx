import * as THREE from 'three'
import {
  Group, Mesh,
  MeshStandardMaterial,
} from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'

import { AssetData, AssetRenderOneData, AssetTransforms, GLTF_Type } from './Types'
import { getTransformMatrix } from './getTransforms'


export class AssetLoader {
  public static preload = (assetData: AssetData) => {
    if (assetData.preload)
      useLoader.preload(GLTFLoader, assetData.model_path)
  }

  public static load = (props: AssetRenderOneData & { applyTransforms?: boolean }) => {
    const {
      asset: assetData,
      applyTransforms,
      ...assetTransforms
    } = props
    const isFBX = assetData.model_path.endsWith('.fbx')
    const asset = useLoader(GLTFLoader, assetData.model_path)

    let scene = this.applyMaterialGLTF((asset as GLTF_Type).scene)

    if (applyTransforms)
      scene = this.applyTransforms({ scene, ...assetTransforms })

    return isFBX ?
      ({ scene, animations: [] })
      :
      ({ ...asset, scene })
  }

  private static applyMaterialGLTF = (gltf: Group): Group => {
    const gltfWithMaterial = gltf.clone()

    const applyToMaterial = (material: MeshStandardMaterial) => {
      if (material.opacity < 1) {
        material.transparent = true
      }

      material.needsUpdate = true
    }

    gltfWithMaterial.traverse((_object: THREE.Object3D) => {
      const object = _object as Mesh
      
      if (object.isMesh) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => applyToMaterial(material as MeshStandardMaterial))
        }
        else
          applyToMaterial(object.material as MeshStandardMaterial)
      }
    })

    return gltfWithMaterial
  }

  public static changeMaterialGLTF = (gltf: Group, newMaterial: THREE.MeshStandardMaterial): Group => {
    const gltfWithMaterial = gltf.clone()

    gltfWithMaterial.traverse((_object: THREE.Object3D) => {
      const object = _object as Mesh
      
      if (object.isMesh) {
        if (Array.isArray(object.material)) {
          object.material = object.material.map(() => newMaterial)
        }
        else
          object.material = newMaterial
      }
    })

    return gltfWithMaterial
  }

  public static applyTransforms: (props: { scene: Group } & AssetTransforms) => Group = (props) => {
    const sceneTransformed = props.scene.clone()
    const transformMatrix = getTransformMatrix(props)

    sceneTransformed.applyMatrix4(transformMatrix)

    return sceneTransformed
  }
}
