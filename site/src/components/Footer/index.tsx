import { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../Store/StoreContext'
import sections from '../Header/sections'
import { isMobile } from 'react-device-detect'


const Footer: FC = observer(() => {
  const { store } = useContext(StoreContext)
  const {
    sectionIndex
  } = store
  const section = sections[sectionIndex]

  return (
    <div className='Footer'>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h1 className={`${isMobile ? 'h2 mb-5' : 'h1'} text-center text-uppercase`}>
              {section.label}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
})


export default Footer
