import React from "react";
import CartIems from "../Components/CartItems/CartItems";
import LoginSignUp from "./LoginSignUp";

const Cart = () => {

    if (localStorage.getItem("auth-token")) {
        return (
            <div>
                <CartIems />
            </div>
        )
    }
    else {
        return (
            <div>
                <LoginSignUp />
            </div>
        )
    }
}

export default Cart