import MediaReel from '../lib/components/Three/MediaReel'
import ThreeScene from '../lib/components/Three/ThreeScene'

const Page = () => {
  return (
    // <div className='container p-0'>
      <div className='row'>
        {/* <div className='col-1 desktop-only'>
          <div className='mb-1' />
        </div> */}
        {/* <div className='col col-md-8'> */}
        <div className='col'>
          <div className='Architects__Three-container'>
            <ThreeScene
              className='Architects__Three desktop-only'
            >
              <MediaReel />
            </ThreeScene>
            <ThreeScene
              className='Architects__Three mobile-only'
            >
              <MediaReel position={[2, 0, 0]} scale={[.7, .7, .7]} />
            </ThreeScene>
          </div>
        </div>
        {/* <div className='col-1 desktop-only'>
          <div className='mb-1' />
        </div> */}
      </div>
    // </div>
  )
}


export default Page
