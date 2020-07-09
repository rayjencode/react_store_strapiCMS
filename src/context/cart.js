// cart context

import React, { useState, createContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from './actions';
// import localCart from '../utils/localCart';

function getCartLS() {
    return localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
}

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(reducer, getCartLS());
    const [total, setTotal] = useState(0);
    const [cartQty, setCartQty] = useState(0);

    const removeItem = (id) => {
        dispatch({ type: REMOVE, payload: id });
    };

    const increaseAmount = (id) => {
        dispatch({ type: INCREASE, payload: id });
    };

    const decreaseAmount = (id, amount) => {
        if (amount === 1) {
            dispatch({ type: REMOVE, payload: id });
            return;
        } else {
            dispatch({ type: DECREASE, payload: id });
        }
    };

    const addToCart = (product) => {
        const item = [...cart].find((item) => item.id === product.id);
        if (item) {
            dispatch({ type: INCREASE, payload: product.id });
            return;
        } else {
            dispatch({ type: ADDTOCART, payload: product });
        }
    };

    const clearCart = () => {
        dispatch({ type: CLEARCART });
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        const newCartQty = cart.reduce((total, cartQty) => {
            return (total += cartQty.amount);
        }, 0);

        setCartQty(newCartQty);

        let newTotal = cart.reduce((total, cartQty) => {
            return (total += cartQty.amount * cartQty.price);
        }, 0);

        newTotal = parseFloat(newTotal.toFixed(2));

        setTotal(newTotal);

        return () => {};
    }, [cart]);

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                cartQty,
                removeItem,
                increaseAmount,
                decreaseAmount,
                addToCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
