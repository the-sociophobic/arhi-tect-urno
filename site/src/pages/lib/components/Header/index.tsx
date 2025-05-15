import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { FC } from 'react'

import navLinks from '../../utils/navLinks'
import logoImgSrc from '../../assets/images/logo.svg'


const Header: FC = () => {
  const pathname = usePathname()
  const currentLabel = navLinks.find(navLink => pathname.includes(navLink.href))

  if (pathname === '/')
    return <></>

  return (
    <div className='Header'>
      <div className='container my-3'>
        <div className='row'>
          <div className='col-1'>
            <div className='d-flex flex-column justify-content-center h-100'>
              {navLinks.map(navLink =>
                <Link
                  key={navLink.href}
                  href={navLink.href}
                  className={`Header__link ${navLink.href === currentLabel?.href && 'Header__link--active'}`}
                >
                  {navLink.label}
                </Link>
              )}
            </div>
          </div>
          <div className='col-8 d-flex justify-content-center'>
            <div className='Header__h1'>
              {currentLabel?.label}
            </div>
          </div>
          <div className='col-1'>
            <div className='d-flex flex-column align-items-end justify-content-center h-100'>
              <Link href='/'>
                <Image
                  src={logoImgSrc}
                  alt='logo'
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header
