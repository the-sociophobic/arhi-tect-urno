import { PageProps } from '@/app/lib/types/default.type'


const Page = async ({ params }: PageProps) => {
  const { pageId } = await params

  return (
    <div className='container'>
      /{pageId}
    </div>
  )
}


export default Page
