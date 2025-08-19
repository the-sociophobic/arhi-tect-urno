import { FC, useContext } from 'react'
import { observer } from 'mobx-react-lite'

import sections from './sections'
import { StoreContext } from '../Store/StoreContext'

import HintSvg from '../../assets/images/hint.svg'
import LogoSvg from '../../assets/images/logo.svg'


const Header: FC = observer(() => {
  const { store } = useContext(StoreContext)
  const {
    sectionIndex,
    setScroll
  } = store

  return (
    <div className='Header'>
      <div className='container'>
        <div className='row'>

          <div className='col-2 d-none d-lg-block'>
            {/* <div className='Header__hint'>
              <HintSvg />
            </div> */}
          </div>

          <div className='col ps-md-0 ps-3'>
            <div className='Header__links'>
              {sections.map((link, linkIndex) =>
                <div
                  key={link.label}
                  onClick={() => setScroll(linkIndex)}
                  className={`
                    Header__links__item
                    ${linkIndex === 0 && 'd-none'}
                    ${linkIndex === sectionIndex && 'Header__links__item--selected'}
                  `}
                >
                  {link.label}
                </div>
              )}
            </div>
          </div>

          <div className='col-2 d-flex justify-content-end pe-md-0 pe-3'>
            {/* <div className='Header__logo'> */}
              <LogoSvg className='' />
            {/* </div> */}
          </div>
        </div>

      </div>
    </div>
  )
})


export default Header
