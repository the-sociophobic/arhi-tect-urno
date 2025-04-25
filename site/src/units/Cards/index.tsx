import { FC, useRef } from 'react'
import { AssetLoader } from '../Asset'
import generatePath from '../../utils/generatePath'
import { Plane } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import urls from './urls'


const Cards: FC = () => {
  const assetRef = useRef(AssetLoader.load({
    asset: {
      model_path: generatePath('/models/card_positions.glb')
    },
    applyTransforms: true
  }))
  const positions = assetRef.current.scene.children.map(point => point.position)

  const loadedTextures = useLoader(
    TextureLoader,
    urls
  )

  return (
    <group scale={.5}>
      {positions.map((pos, posIndex) => {
        const rotation = Math.acos(pos.z) * Math.sign(pos.x) - Math.PI
        const textureIndex = posIndex % urls.length

        return (
          <Plane
            position={pos}
            rotation={[0, 0, 0]}
            scale={4}
          >
            <meshStandardMaterial
              map={loadedTextures[textureIndex]}
            />
          </Plane>
        )
      }
      )}
    </group>
  )
}


export default Cards
