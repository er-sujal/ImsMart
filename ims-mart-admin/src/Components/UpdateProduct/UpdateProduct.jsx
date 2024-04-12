import React, { useEffect, useState } from 'react'
import './UpdateProduct.css'
import pen from '../../assets/pen-svgrepo-com.svg'
import upload_area from '../../assets/upload_area.svg'

const UpdateProduct = () => {
    const [allproducts, setAllProducts] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((res) => res.json())
            .then((data) => { setAllProducts(data) })
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        setShowUpdateForm(true);
    };

    const handleAddProduct = async () => {
        try {
            const productId = selectedProduct.id; // Assuming selectedProduct contains the product to be updated
            const response = await fetch(`http://localhost:4000/updateproduct/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: document.querySelector('input[name="name"]').value,
                    old_price: document.querySelector('input[name="old_price"]').value,
                    new_price: document.querySelector('input[name="new_price"]').value,
                    category: document.querySelector('select[name="category"]').value,
                    // You may need to handle image upload separately if needed
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Product updated successfully:', data.product);
                // You can update the state or perform any additional actions upon successful update
                // For example, refetch all products to update the UI
                fetchInfo();
                // Reset the selectedProduct and hide the update form
                setSelectedProduct(null);
                setShowUpdateForm(false);
            } else {
                console.error('Error updating product:', data.message);
                // Handle error scenario
            }
        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error scenario
        }
    };

    return (
        <div className="updateproduct">
            <h1>Update Product From List</h1>
            {!showUpdateForm && (
                <div>
                    <div className="listproduct-format-main">
                        <p>Product</p>
                        <p>Title</p>
                        <p>Old Price</p>
                        <p>New Price</p>
                        <p>Category</p>
                        <p>Update</p>
                    </div>
                    <div className="listproduct-allproduct">
                        <hr />
                        {allproducts.map((product, index) => (
                            <div key={product.id}>
                                <div className="listproduct-format-main listproduct-format">
                                    <img src={product.image} alt="" className='listproduct-product-icon' />
                                    <p>{product.name}</p>
                                    <p>₹{product.old_price}</p>
                                    <p>₹{product.new_price}</p>
                                    <p>{product.category}</p>
                                    <img onClick={() => handleUpdateClick(product)} className='listproduct-remove-icon' src={pen} alt="" />
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {showUpdateForm && selectedProduct && (
                <div className='add-product'>
                    <div className="addproduct-itemfield">
                        <p>Product Title</p>
                        <input type="text" name='name' defaultValue={selectedProduct.name} />
                    </div>
                    <div className="addproduct-price">
                        <div className="addproduct-itemfield">
                            <p>Price</p>
                            <input type="text" name='old_price' defaultValue={selectedProduct.old_price} />
                        </div>
                        <div className="addproduct-itemfield">
                            <p>Offer Price</p>
                            <input type="text" name='new_price' defaultValue={selectedProduct.new_price} />
                        </div>
                    </div>
                    <div className="addproduct-itemfield">
                        <p>Product Category</p>
                        <select name="category" className='add-product-selector' defaultValue={selectedProduct.category}>
                            <option value="women">Women</option>
                            <option value="men">Men</option>
                            <option value="kid">Kid</option>
                            <option value="mobile">Mobile</option>
                            <option value="leptop">Leptop</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>
                    <div className="addproduct-itemfield">
                        <label htmlFor="file-input">
                            <img src={selectedProduct ? selectedProduct.image : upload_area} alt="" className='addproduct-thumnail-img' />
                        </label>
                        <input type="file" name="image" id="file-input" hidden />
                    </div>
                    <button className='addproduct-btn' onClick={handleAddProduct}>Update Product</button>
                </div>
            )}
        </div>
    )
}

export default UpdateProduct;
