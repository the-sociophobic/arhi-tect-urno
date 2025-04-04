import { FC } from 'react'

import Scene from './components/Scene'

import './assets/style.sass'


const App: FC = () => {
  return (
    <div className='App'>
      {/* <div className='video-container'>
        <video src='./hdri/test.mp4' id='video' />
      </div> */}
      <Scene />
    </div>
  )
}


export default App
