import MagicSphere from '../lib/components/Three/MagicSphere'
import ThreeScene from '../lib/components/Three/ThreeScene'
import ArchitectCard from './ArchitectCard'
import ArchitectCardEmpty from './ArchitectCardEmpty'
import architects from './list'


const Page = () => {
  const architectsMapped = architects.map(architect =>
    <ArchitectCard
      key={architect.id}
      {...architect}
    />
  )

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-1'>
          <div className='mb-1' />
        </div>
        <div className='col-8 mb-5'>
          <div className='Architects__Three-container'>
            <ThreeScene className='Architects__Three'>
              <MagicSphere />
            </ThreeScene>
          </div>
        </div>
        <div className='col-1'>
          <div className='mb-1' />
        </div>
      </div>
      <div className='row'>
        {architectsMapped[0]}
        <ArchitectCardEmpty />
        {architectsMapped.slice(1, 4)}
        <ArchitectCardEmpty />
        {architectsMapped.slice(4, 5)}
        <ArchitectCardEmpty />
        {architectsMapped.slice(5)}
      </div>
    </div>
  )
}


export default Page
