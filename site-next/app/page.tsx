'use client'

import { useEffect, useState } from 'react'
import { ScrollControls } from '@react-three/drei'

import ThreeScene from './lib/components/Three/ThreeScene'
import { MainRender } from './lib/components/Three/Main'


const Page = () => {
  const [appear, setAppear] = useState(false)

  useEffect(() => {
    setAppear(true)
  }, [])

  return (
    <div className='Main'>
      <div
        className={`Main__container ${appear && 'Main__container--appear'}`}
      >
        <p className='Main__h1--gray no-select'>
          АРХИТЕКТУР
        </p>
        <p className='Main__h1--yellow no-select'>
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
