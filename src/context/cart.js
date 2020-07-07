// cart context

import React, { useState, createContext, useEffect } from 'react';
// import localCart from '../utils/localCart';

function getCartLS() {
    return localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [];
}

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getCartLS());
    const [total, setTotal] = useState(0);
    const [cartQty, setCartQty] = useState(0);

    const removeItem = (id) => {
        setCart([...cart].filter((item) => item.id !== id));
    };

    const increaseAmount = (id) => {
        const newCart = [...cart].map((item) => {
            return item.id === id
                ? { ...item, amount: item.amount + 1 }
                : { ...item };
        });

        setCart(newCart);
    };

    const decreaseAmount = (id, amount) => {
        if (amount === 1) {
            removeItem(id);
            return;
        } else {
            const newCart = [
                ...cart.map((item) => {
                    return item.id === id
                        ? { ...item, amount: item.amount - 1 }
                        : { ...item };
                }),
            ];

            setCart(newCart);
        }
    };

    const addToCart = (product) => {
        const { id, image, title, price } = product;

        const item = [...cart].find((item) => item.id === id);

        if (item) {
            increaseAmount(id);
            return;
        } else {
            const newItem = {
                id,
                title,
                price,
                image,
                amount: 1,
            };
            setCart([...cart, newItem]);
        }
    };

    const clearCart = () => {
        setCart([]);
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
