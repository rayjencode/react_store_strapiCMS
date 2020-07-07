import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/Huawei.svg';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUserAlt } from 'react-icons/fa';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';

export default function Header() {
    const { cartQty } = useContext(CartContext);
    const { user, userLogout } = useContext(UserContext);

    return (
        <>
            <header className="header my-3">
                <img src={Logo} alt="logo" className="logo" />
                <nav className="container-fluid">
                    <ul className="font-bold list-unstyled d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                            <li className="mx-2">
                                <Link to="/">Home</Link>
                            </li>

                            <li className="mx-2">
                                <Link to="/products">Products</Link>
                            </li>
                            <li className="mx-2">
                                <Link to="/about">About</Link>
                            </li>

                            {user.token && (
                                <li className="mx-2">
                                    <Link to="/checkout">Checkout</Link>
                                </li>
                            )}
                        </div>
                        <div className="d-flex justify-content-between">
                            <li className="mx-2">
                                <Link to="/login" onClick={userLogout}>
                                    {user.token ? 'Logout' : 'Login'}
                                </Link>
                            </li>
                            <li className="mx-2 relative">
                                <Link to="/cart">
                                    <span className="absolute cart__count font-light">
                                        {cartQty}
                                    </span>
                                    <FaShoppingCart />
                                </Link>
                            </li>

                            <li className="mx-2 relative">
                                <Link to="/order">
                                    <FaUserAlt />
                                </Link>
                            </li>
                        </div>
                    </ul>
                </nav>
            </header>
        </>
    );
}
