import React, { useContext } from 'react';
import { ProductContext } from '../context/products';
import LoadingImg from '../components/Loading';
import Filters from '../components/Products/Filters';
import PageProducts from '../components/Products/PageProducts';

export default function Products() {
    const { loading, sorted } = useContext(ProductContext);

    return loading ? (
        <LoadingImg />
    ) : (
        <>
            <Filters />
            <PageProducts products={sorted} />
        </>
    );
}
