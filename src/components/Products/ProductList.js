import React from 'react';
import Product from './Product';

export default function ProductList({ products, title }) {
    console.log(products);

    return (
        <div className="container-fluid">
            <h2 className="my-5 section-title text-center fontRoboto text-uppercase">
                {title}
            </h2>
            <div className="row">
                {products.map((item) => (
                    <Product key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
}
