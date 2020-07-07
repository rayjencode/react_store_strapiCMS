/*PRODUCT CONTEXT */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts } from '../utils/helpers';

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${url}/products`).then((res) => {
            const featured = featuredProducts(flattenProducts(res.data));
            const products = flattenProducts(res.data);
            setProducts(products);
            setLoading(false);
            setFeatured(featured);
        });
        return () => {};
    }, [setProducts, setLoading, setFeatured]);

    return (
        <ProductContext.Provider value={{ loading, featured, products }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
