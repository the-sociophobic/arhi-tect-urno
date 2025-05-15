import isProd from './isProd'


const generatePath = (path: string) => {
  return (isProd() ? './arhi-tect-urno' : './') + path
}


export default generatePath
