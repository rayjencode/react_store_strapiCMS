import React from 'react';
import { Link } from 'react-router-dom';

export default function Product({
    id,
    title,
    price,
    category,
    description,
    image,
}) {
    // console.log(`title:`, title);
    // console.log(`price:`, price);
    // console.log(`url:`, url);
    // console.log(`description:`, description);
    return (
        <div className="card text-center">
            <img className="card__img" src={image} alt={title} />
            <h5 className="card__title">{title}</h5>
            <p className="card__desc my-2">
                {description === null ? '...' : description.substring(0, 50)}...
            </p>
            <Link to={`/products/${id}`} className="btn btn-primary">
                Details
            </Link>
            <h3 className="my-2">${price}</h3>
        </div>
    );
}
