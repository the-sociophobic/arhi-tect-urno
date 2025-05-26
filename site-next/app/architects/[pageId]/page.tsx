import { PageProps } from '@/app/lib/types/default.type'
import Architect from './Architect'


const Page = async ({ params }: PageProps) => {
  const { pageId } = await params

  return (
    <Architect pageId={pageId} />
  )
}


export default Page
