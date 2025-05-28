'use client'

import { useRouter } from 'next/navigation'

import ThreeScene from './lib/components/Three/ThreeScene'
import { MainRender } from './lib/components/Three/Main'
import { ScrollControls } from '@react-three/drei'


const Page = () => {
  // const fontSize = Math.floor((document?.body?.clientWidth || 1000) / 12)
  const fontSize = '175px'
  const router = useRouter()

  return (
    <div className='h-100 position-relative'>
      <div
        className='d-flex flex-row justify-content-center align-items-center h-100'
        style={{
          fontSize,
          fontWeight: '300',
          letterSpacing: '-10px'
        }}
      >
        <p className='Main__h1--gray'>
          АРХИТЕКТУР
        </p>
        <p className='Main__h1--yellow'>
          НО
        </p>
      </div>
      <div className='abs-cover'>
        <ThreeScene>
          <ScrollControls pages={3}>
            <MainRender />
          </ScrollControls>
        </ThreeScene>
      </div>
    </div>
  )
}


export default Page
