import { PageProps } from '@/app/lib/types/default.types'
import architects from '../list'
import ImageCropped from '@/app/lib/components/ImageCropped'


const Page = async ({ params }: PageProps) => {
  const { pageId } = await params
  console.log(pageId)
  const currentArchitect = architects.find(architect => architect.href === pageId)

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-3'>
          <ImageCropped
            src={currentArchitect!.photo}
            className=''
          />
          <div className=''>
            {currentArchitect!.name}
          </div>
          <div className=''>
            {currentArchitect!.company}
          </div>
          <div className=''>
            {currentArchitect!.description}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Page
