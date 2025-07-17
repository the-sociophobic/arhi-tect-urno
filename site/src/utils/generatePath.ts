import isProd from './isProd'


const generatePath = (path: string) => {
  return (isProd() ? 'https://the-sociophobic.github.io/arhi-tect-urno/' : './arhi-tect-urno') + path
}


export default generatePath
