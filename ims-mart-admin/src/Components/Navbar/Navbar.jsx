import React from 'react'
import './Navbar.css'
import brand from '../../assets/lo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={brand} width={250} height={100} alt="" />
    </div>
  )
}

export default Navbar