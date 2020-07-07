import React from 'react';
import { Link } from 'react-router-dom';

export default function EmptyCart() {
    return (
        <div className="container-fluid">
            <section className="empty-cart section text-center">
                <h3 className="my-4">Empty Cart...</h3>
                <Link to="/products" className="btn btn-primary ">
                    Fill It
                </Link>
            </section>
        </div>
    );
}
