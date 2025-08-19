import { FC, useCallback, useContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

import generatePath from '../../utils/generatePath'
import { StoreContext } from '../../components/Store/StoreContext'
import HintsRenderOne from './HintsRenderOne'
import useMousePointerOnHover from '../../hooks/useMousePointerOnHover'


const Hints: FC = () => {
  const assetRef = useRef(null)
  const scroll = useScroll()

  useFrame(threeState => {
    const asset = assetRef.current

    if (!asset)
      return

    const scrollPos = scroll.range(0, 1)
    let angle = 0

    if (scrollPos <= .05) {
      angle = 0
    } else if (scrollPos <= .055) {
      angle = Math.PI / 2
    } else if (scrollPos <= .955) {
      angle = Math.PI
    } else {
      angle = Math.PI * 1.5
    }


    const currentAngle = (asset as any).rotation.y as number
    const modifiedAngle = currentAngle + (angle - currentAngle) * .05;
    (asset as any).rotation.set(0, modifiedAngle, 0)
  })

  const { store } = useContext(StoreContext)
  const {
    setScroll
  } = store
  const onClick = useCallback(() => {
    if ((assetRef.current as any).rotation.y < 0.055) {
      setScroll(0, 0.054)
    } else if ((assetRef.current as any).rotation.y > 0.98) {
      setScroll(0, 0.07)
    }
  }, [setScroll, (assetRef.current as any)?.rotation.y])

  const hints = [
    {
      texture: generatePath('/hints/play.png'),
      rotation: 0
    },
    {
      texture: generatePath('/hints/scroll.png'),
      rotation: Math.PI * 1.5
    },
    {
      texture: generatePath('/hints/replay.png'),
      rotation: Math.PI / 2
    },
  ]
  const mousePointerProps = useMousePointerOnHover()

  return (
    <group
      ref={assetRef}
      position={[0, .25, 0]}
      scale={[2, 2, 2]}
      onClick={onClick}
      {...mousePointerProps}
    >
      {hints.map(hint =>
        <HintsRenderOne
          key={hint.texture}
          {...hint}
        />
      )}
    </group>
  )
}


export default Hints
