/*PRODUCT CONTEXT */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from '../utils/URL';
import { featuredProducts, flattenProducts, paginate } from '../utils/helpers';

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [featured, setFeatured] = useState([]);

    const [sorted, setSorted] = useState([]);
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState({
        search: '',
        category: 'all',
        shipping: false,
        price: 'all',
    });

    const changePage = (index) => {
        // console.log(index);
        setPage(index);
    };

    const updateFilters = (e) => {
        console.log(e);
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${url}/products`).then((res) => {
            const featured = featuredProducts(flattenProducts(res.data));
            const products = flattenProducts(res.data);
            setSorted(paginate(products));
            setProducts(products);
            setLoading(false);
            setFeatured(featured);
        });
        return () => {};
    }, [setProducts, setLoading, setFeatured]);

    return (
        <ProductContext.Provider
            value={{
                loading,
                featured,
                products,
                sorted,
                page,
                filters,
                changePage,
                updateFilters,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
