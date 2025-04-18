import { FC } from 'react'

import Scene from './components/Scene'

import './assets/style.sass'
import generatePath from './utils/generatePath'


const App: FC = () => {
  return (
    <div className='App'>
      <div className='video-container'>
        <video
          id='video'
          loop
          muted
          crossOrigin='anonymous'
          // playsinline
        >
          {/* <source src='./arhi-tect-urno/hdri/test.mov' /> */}
          <source src={generatePath('/hdri/test.mov')} />
        </video>
      </div>
      <Scene />
    </div>
  )
}


export default App
