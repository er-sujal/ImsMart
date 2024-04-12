import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import brand from '../Assets/lo.png'
import cart from '../Assets/cart.png'
import { ShopContext } from '../../Context/ShopContext'
// import SearchComponent from '../Search/SearchComponent'


const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const [showFashionMenu, setShowFashionMenu] = useState(false);
    const [showTechMenu, setShowTechMenu] = useState(false);
    const {getTotalCartItems} = useContext(ShopContext)

    const handleFashionMenu = () => {
        setShowFashionMenu(!showFashionMenu);
    }

    const handleTechMenu = () => {
        setShowTechMenu(!showTechMenu);
    }

    return (
        <div className="navbar">
            <div className="navlogo">
                {/* <img src={logo} width={100} height={100} alt="logo-here"/> */}
                <img src={brand} width={250} height={100} alt="" />
            </div>
            <ul className="navMenu">
                <li onClick={() => setMenu("home")}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link></li>
                <li onMouseEnter={handleFashionMenu} onMouseLeave={handleFashionMenu}>
                    <span style={{ cursor: 'pointer' }}>Fashion</span>
                    {showFashionMenu && (
                        <ul className="dropdown-menu">
                            <li onClick={() => setMenu("Men")}><Link style={{ textDecoration: 'none' }} to='/men'>Men</Link></li>
                            <li onClick={() => setMenu("Women")}><Link style={{ textDecoration: 'none' }} to='/women'>Women</Link></li>
                            <li onClick={() => setMenu("Kids")}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link></li>
                        </ul>
                    )}
                </li>
                <li onMouseEnter={handleTechMenu} onMouseLeave={handleTechMenu}>
                    <span style={{ cursor: 'pointer' }}>Technology</span>
                    {showTechMenu && (
                        <ul className="dropdown-menu">
                            <li onClick={() => setMenu("Mobile")}><Link style={{ textDecoration: 'none' }} to='/mobile'>Mobile</Link></li>
                            <li onClick={() => setMenu("Leptop")}><Link style={{ textDecoration: 'none' }} to='/leptop'>Leptop</Link></li>
                            <li onClick={() => setMenu("Accessories")}><Link style={{ textDecoration: 'none' }} to='/accessories'>Accessories</Link></li>
                        </ul>
                    )}
                </li>
                {/* <li><SearchComponent/></li> */}
                <li onClick={() => setMenu("ip")}><input type="text" name="Search" id="" width={500} height={100} /></li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token')?<button onClick={()=>{
                    localStorage.removeItem('auth-token')
                    window.location.replace('/')
                }}>Logout</button>:<Link style={{ textDecoration: 'none' }} to='/login'><button>Login</button></Link>}
                {localStorage.getItem('auth-token')?<button>UserActive</button>:<button>GeustActive</button>}
                
                <Link style={{ textDecoration: 'none' }} to='/cart'><img src={cart} height={55} alt="cart here" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar;