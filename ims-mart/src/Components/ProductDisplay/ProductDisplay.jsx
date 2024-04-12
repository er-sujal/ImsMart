import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props
    const { addToCart ,cartItems } = useContext(ShopContext)
    var flag = false;

    if (product.category == "men" || product.category == "women" || product.category == "kid") {
        flag = true;
    }

    if (flag) {
        return (
            <div className='productdisplay'>
                <div className="productdisplay-left">
                    <div className="productdisplay-img-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                    <div className="productdisplay-img">
                        <img className='productdisplay-main-img' src={product.image} alt="" />
                    </div>
                </div>
                <div className="productdisplay-right">
                    <h1>{product.name}</h1>
                    <div className="productdisaplay-right-stars">
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_dull_icon} alt="" />
                        <p>(122)</p>
                    </div>
                    <div className="prductdisplay-right-prices">
                        <div className="prductdisplay-right-price-old">₹{product.old_price}</div>
                        <div className="prductdisplay-right-price-new">₹{product.new_price}</div>
                    </div>
                    <div className="prductdisplay-right-description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nam ipsa quam sapiente optio eveniet quae hic facilis nisi nesciunt! Vitae et quidem consectetur aliquam sequi asperiores vero sunt eos.
                    </div>
                    <div className="productdisplay-right-size">
                        <h1>Select Size</h1>
                        <div className="productdisplay-right-sizes">
                            <div>S</div>
                            <div>M</div>
                            <div>L</div>
                            <div>XL</div>
                            <div>XXL</div>
                        </div>
                    </div>
                    <button onClick={() => {
                        if (localStorage.getItem("auth-token")) {
                            addToCart(product.id);
                            alert(`Product ${product.name} is added to cart && quantity is ${cartItems[product.id]}`)
                        }
                        else {
                            alert("Please login.");
                            window.location.replace('/login')
                        }
                    }}>ADD TO CART</button>
                    <p className="productdisplay-right-category"><span>Category :</span> Women , T-Shirt, Crop Top</p>
                    <p className="productdisplay-right-category"><span>Tags :</span>Morden, Letest</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='productdisplay'>
                <div className="productdisplay-left">
                    <div className="productdisplay-img-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                    <div className="productdisplay-img">
                        <img className='productdisplay-main-img' src={product.image} alt="" />
                    </div>
                </div>
                <div className="productdisplay-right">
                    <h1>{product.name}</h1>
                    <div className="productdisaplay-right-stars">
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_icon} alt="" />
                        <img src={star_dull_icon} alt="" />
                        <p>(122)</p>
                    </div>
                    <div className="prductdisplay-right-prices">
                        <div className="prductdisplay-right-price-old">₹{product.old_price}</div>
                        <div className="prductdisplay-right-price-new">₹{product.new_price}</div>
                    </div>
                    <div className="prductdisplay-right-description">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus nam ipsa quam sapiente optio eveniet quae hic facilis nisi nesciunt! Vitae et quidem consectetur aliquam sequi asperiores vero sunt eos.
                    </div>
                    <br /><br /><br /><br /><br /><br /><br />

                    <button onClick={() => {
                        if (localStorage.getItem("auth-token")) {
                            addToCart(product.id);
                            alert(`Product ${product.name} is added to cart && quantity is ${cartItems[product.id]}`)
                        }
                        else {
                            alert("Please login.");
                            window.location.replace('/login')
                        }
                    }}>ADD TO CART</button>
                </div>
            </div>
        )

    }


}

export default ProductDisplay