'use client'

import MagicSphere from '../lib/components/Three/MagicSphere'
import ThreeScene from '../lib/components/Three/ThreeScene'
import generatePath from '../lib/utils/generatePath'


const Sphere = () => {
  return (
    <>
      <video
        className='d-none'
        id='video'
        loop
        muted
        crossOrigin='anonymous'
      // playsinline
      >
        {/* <source src='./arhi-tect-urno/hdri/test.mov' /> */}
        <source src={generatePath('/three/video/7.mp4')} />
      </video>

      <div className='row'>
        <div className='col mb-5'>
          <div className='Architects__Three-container'>
            <ThreeScene
              // orthographic={false}
              className='Architects__Three'
            >
              <MagicSphere />
            </ThreeScene>
          </div>
        </div>
      </div>
    </>
  )
}


export default Sphere
