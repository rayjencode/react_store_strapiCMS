import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import defaultImg from '../../assets/mainBcg.jpeg';

export default function Product({
    id,
    title,
    price,
    category,
    description,
    image,
}) {
    return (
        <div className="card text-center">
            <img
                className="card__img"
                src={image || defaultImg}
                alt={title || 'Default Title'}
            />
            <h5 className="card__title">{title || ' Default Title'}</h5>
            <p className="card__desc my-2">
                {/* {description === null ? '...' : description.substring(0, 50)}... */}
            </p>
            <Link to={`/products/${id}`} className="btn btn-primary">
                Details
            </Link>
            <h3 className="my-2">${price || 0}</h3>
        </div>
    );
}

Product.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
};
