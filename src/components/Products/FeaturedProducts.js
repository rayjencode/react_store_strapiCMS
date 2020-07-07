import React, { useContext } from 'react';
import ProductList from './ProductList';
import { ProductContext } from '../../context/products';
import Loading from '../Loading';

const FeaturedProducts = () => {
    let { loading, featured } = useContext(ProductContext);
    return loading ? (
        <Loading />
    ) : (
        <ProductList title="Featured Products" products={featured} />
    );
};

export default FeaturedProducts;
