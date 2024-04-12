import React from 'react'
import './Offers.css'
import exlusive_image from '../Assets/exclusive_image.png'

function Offers() {
  return (
    <div className='offers'>
        <div className="offers-left">
            <h1>Exlusive</h1>
            <h1>Offers For You</h1>
            <p>Only Best Seller Products</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right">
            <img src={exlusive_image} alt="" />
        </div>
    </div>
  )
}

export default Offers