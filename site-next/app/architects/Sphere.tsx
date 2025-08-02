'use client'

import { FC } from 'react'
import MagicSphere from '../lib/components/Three/MagicSphere'
import ThreeScene from '../lib/components/Three/ThreeScene'
import generatePath from '../lib/utils/generatePath'


const Sphere: FC<{
  randomVideoURL: string
  customVideoURL?: string
}> = ({
  randomVideoURL,
  customVideoURL
}) => {
  console.log(customVideoURL)
  return (
    <>
      <video
        className='d-none'
        id='video'
        loop
        muted
        crossOrigin='anonymous'
      >
        <source
          src={customVideoURL || generatePath(randomVideoURL)}
          // resource=''
        />
      </video>

      <div className='row'>
        <div className='col mb-5'>
          <div className='Architects__Three-container'>
            <ThreeScene className='Architects__Three'>
              <MagicSphere />
            </ThreeScene>
          </div>
        </div>
      </div>
    </>
  )
}


export default Sphere
