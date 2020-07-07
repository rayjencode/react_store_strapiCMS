import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { ProductContext } from '../context/products';
import { CartContext } from '../context/cart';
import Loading from '../components/Loading';

const ProductDetails = () => {
    const { id } = useParams();
    const history = useHistory();
    const { products } = useContext(ProductContext);

    const product = products.find((item) => item.id === parseInt(id));
    const { addToCart } = useContext(CartContext);

    if (products.length === 0) {
        return <Loading />;
    } else {
        const { title, description, price, image } = product;
        return (
            <>
                <section className="single-product container-fluid">
                    <img
                        src={image}
                        alt={title}
                        className="single-product-image"
                    />
                    <article>
                        <h1>{title}</h1>
                        <h2>${price}</h2>
                        <p>{description}</p>
                        <button
                            className="btn btn-alert my-4"
                            onClick={() => {
                                addToCart(product);
                                history.push(`/cart`);
                            }}
                        >
                            Add to Cart
                        </button>
                    </article>
                </section>
            </>
        );
    }
};

export default ProductDetails;
