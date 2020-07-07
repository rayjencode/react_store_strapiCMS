import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';

import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';

export default function Cart() {
    let { cart, total } = useContext(CartContext);
    let { user } = useContext(UserContext);

    // console.log({ ...cart });

    if (cart.length === 0) {
        return <EmptyCart />;
    } else {
        return (
            <div className="cart-items section container-fluid">
                {cart.map((item) => (
                    <CartItem key={item.id} {...item} />
                ))}
                <h2 className="my-5">Total: ${total}</h2>
                <Link
                    className="btn btn-alert btn-block"
                    to={`${user.token ? '/checkout' : '/login'}`}
                >
                    {user.token ? 'Checkout' : 'Login'}
                </Link>
            </div>
        );
    }
}
