import * as THREE from 'three'
import {
  Group, Mesh,
  MeshStandardMaterial,
  MeshPhongMaterial,
  TextureLoader,
} from 'three'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

import { AssetData, AssetRenderOneData, AssetTransforms, GLTF_Type } from './Types'
import generatePath from '../../utils/generatePath'
// import { getTransformMatrix } from '../../utils/getTransforms'


export class AssetLoader {
  public static preload = (assetData: AssetData) => {
    if (assetData.preload)
      useLoader.preload(
        assetData.model_path.endsWith('.fbx') ?
          FBXLoader
          :
          GLTFLoader,
        assetData.model_path
      )
  }

  public static load = (props: AssetRenderOneData & { applyTransforms?: boolean }) => {
    const {
      asset: assetData,
      applyTransforms,
      ...assetTransforms
    } = props
    const isFBX = assetData.model_path.endsWith('.fbx')
    const asset = useLoader(
      isFBX ?
        FBXLoader
        :
        GLTFLoader,
      assetData.model_path
    )

    let scene = isFBX ?
      this.applyMaterialFBX(asset as Group)
      :
      this.applyMaterialGLTF((asset as GLTF_Type).scene)

    if (applyTransforms)
      scene = this.applyTransforms({ scene, ...assetTransforms })

    return isFBX ?
      ({ scene, animations: [] })
      :
      ({ ...asset, scene })
  }

  private static applyMaterialFBX = (fbx: Group, texturePath?: string): Group => {
    const fbxWithMaterial = fbx.clone()
    let texture: THREE.Texture | undefined
    if (texturePath) {
      texture = useLoader(TextureLoader, texturePath)
      texture!.wrapS = THREE.RepeatWrapping
      texture!.wrapT = THREE.RepeatWrapping
      texture!.repeat.set(1, 1)
    }
    const envMap = useLoader(RGBELoader, generatePath('/hdri/envMap.hdr'))
    envMap.mapping = THREE.EquirectangularReflectionMapping

    const applyToMaterial = (material: MeshPhongMaterial) => {
      if (texture)
        material.map = texture
      if (material.reflectivity > 0) {
        material.envMap = envMap
        material.combine = 0
      }

      material.needsUpdate = true
    }

    fbxWithMaterial.traverse(((object: Mesh) => {
      if (object.isMesh) {
        if (Array.isArray(object.material))
          object.material.forEach(material => applyToMaterial(material as MeshPhongMaterial))
        else
          applyToMaterial(object.material as MeshPhongMaterial)
      }
    }) as any)

    return fbxWithMaterial
  }

  private static applyMaterialGLTF = (gltf: Group): Group => {
    const gltfWithMaterial = gltf.clone()

    const applyToMaterial = (material: MeshStandardMaterial) => {
      if (material.opacity < 1) {
        material.transparent = true
      }

      material.needsUpdate = true
    }

    gltfWithMaterial.traverse(((object: Mesh) => {
      if (object.isMesh) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => applyToMaterial(material as MeshStandardMaterial))
        }
        else
          applyToMaterial(object.material as MeshStandardMaterial)
      }
    }) as any)

    return gltfWithMaterial
  }

  public static changeMaterialGLTF = (gltf: Group, newMaterial: THREE.MeshStandardMaterial): Group => {
    const gltfWithMaterial = gltf.clone()

    gltfWithMaterial.traverse(((object: Mesh) => {
      if (object.isMesh) {
        if (Array.isArray(object.material)) {
          object.material = object.material.map(() => newMaterial)
        }
        else
          object.material = newMaterial
      }
    }) as any)

    return gltfWithMaterial
  }

  public static applyTransforms: (props: { scene: Group } & AssetTransforms) => Group = (props) => {
    const sceneTransformed = props.scene.clone()
    // const transformMatrix = getTransformMatrix(props)

    // sceneTransformed.applyMatrix4(transformMatrix)

    return sceneTransformed
  }
}
