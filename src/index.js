import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ProductProvider from './context/products';
import { CartProvider } from './context/cart';
import { UserProvider } from './context/user';
import { OrderProvider } from './context/order';

ReactDOM.render(
    <UserProvider>
        <ProductProvider>
            <CartProvider>
                <OrderProvider>
                    <App />
                </OrderProvider>
            </CartProvider>
        </ProductProvider>
    </UserProvider>,

    document.getElementById('root')
);
