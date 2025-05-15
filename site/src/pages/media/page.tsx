import MediaReel from '../lib/components/Three/MediaReel'
import ThreeScene from '../lib/components/Three/ThreeScene'

const Page = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-1'>
          <div className='mb-1' />
        </div>
        <div className='col-8'>
          <div className='Architects__Three-container'>
            <ThreeScene className='Architects__Three'>
              <MediaReel />
            </ThreeScene>
          </div>
        </div>
        <div className='col-1'>
          <div className='mb-1' />
        </div>
      </div>
    </div>
  )
}


export default Page
