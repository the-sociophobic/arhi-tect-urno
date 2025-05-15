import isProd from './isProd'


const generatePath = (path: string) => {
  // return (isProd() ? './arhi-tect-urno' : './arhi-tect-urno') + path
  return (isProd() ? '' : '') + path
}


export default generatePath
