import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Pages
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Order from './pages/Order';

// Component
import Header from './components/Header';
import Alert from './components/Alert';
import ScrollButton from './components/ScrollButton';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
    return (
        <Router>
            <Header />
            <Alert />
            <ScrollButton />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/cart">
                    <Cart />
                </Route>
                <PrivateRoute path="/checkout">
                    <Checkout />
                </PrivateRoute>
                <PrivateRoute path="/order">
                    <Order />
                </PrivateRoute>
                <Route path="/login">
                    <Login />
                </Route>
                <Route exact path="/products">
                    <Products />
                </Route>
                <Route path="/products/:id" children={<ProductDetails />} />
                <Route path="*">
                    <Error />
                </Route>
            </Switch>
        </Router>
    );
}
