import React from 'react'
import logo from '@/../../public/logo.png'
import Image from 'next/image'



const NavBar = () => {
  return (
    <section>
      <nav>
        <figure>
          <Image src={logo} alt='speak genie' width={150} height={150} />
        </figure>
      </nav>
    </section>
  )
}

export default NavBar
