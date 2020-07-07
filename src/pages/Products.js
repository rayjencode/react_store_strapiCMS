import React, { useContext } from 'react';
import { ProductContext } from '../context/products';
import LoadingImg from '../components/Loading';
import ProductList from '../components/Products/ProductList';

export default function Products() {
    const { loading, products } = useContext(ProductContext);

    return loading ? (
        <LoadingImg />
    ) : (
        <ProductList title="Our Products" products={products} />
    );
}
