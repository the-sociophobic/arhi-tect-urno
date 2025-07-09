import Sphere from './Sphere'


const Page = () => {
  const randomVideoURL = `/three/video/${1 + Math.round(Math.random() * 2)}.mp4`

  return <Sphere randomVideoURL={randomVideoURL} />
}


export default Page
