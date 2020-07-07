import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import URL from '../utils/URL';

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setLoading(true);

        getOrders();
        return () => {};
    }, [setLoading, setOrders]);

    const getOrders = async () => {
        const response = await axios.get(`${URL}/orders`).then((res) => {
            setOrders(res.data);
            setLoading(false);
        });

        return response;
    };

    return (
        <OrderContext.Provider value={{ orders, loading }}>
            {children}
        </OrderContext.Provider>
    );
};

export { OrderProvider, OrderContext };
