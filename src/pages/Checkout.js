import React, { useContext, useState } from 'react';
import { CartContext } from '../context/cart';
import { UserContext } from '../context/user';
import { OrderContext } from '../context/order';
import { useHistory } from 'react-router-dom';
import EmptyCart from '../components/Cart/EmptyCart';
import Visa from '../assets/visa.png';
import {
    CardElement,
    StripeProvider,
    Elements,
    injectStripe,
} from 'react-stripe-elements';

// react-Stripe-element
import submitOrder from '../strapi/submitOrder';

function Checkout(props) {
    let history = useHistory();

    const { cart, total, clearCart } = useContext(CartContext);
    const { user, showAlert, hideAlert, alert } = useContext(UserContext);
    const { getOrders } = useContext(OrderContext);

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    let isEmpty = !name || alert.show;

    const handleSubmit = async (e) => {
        e.preventDefault();
        showAlert({
            msg: 'Submitting order... please wait!',
            type: 'warning',
        });

        const response = await props.stripe
            .createToken()
            .catch((error) => console.log(error));

        console.log(response);

        const { token } = response;

        if (token) {
            setError('');
            const { id } = token;

            let order = await submitOrder({
                name,
                total,
                items: cart,
                stripeTokenId: id,
                userToken: user.token,
            });

            if (order) {
                showAlert({ msg: 'Your Order is complete' });
                clearCart();
                getOrders();
                history.push('/order');
                return;
            } else {
                showAlert({
                    msg:
                        'There was a problem with your order, please try again!',
                    type: 'danger',
                });
            }
        } else {
            hideAlert();
            setError(response.error.message);
        }
    };

    if (cart.length < 1) return <EmptyCart />;

    return (
        <>
            <section className="container-fluid">
                <h2 className="fontRoboto text-uppercase text-center ">
                    Checkout
                </h2>

                <form className="card__checkout">
                    <h3 className="card__checkout__total">
                        Order Total: <span>${total}</span>
                    </h3>

                    {error && <p className="form-empty">{error}</p>}
                    {isEmpty && (
                        <p className="form-empty">Please fill out name field</p>
                    )}

                    <div className="my-3 card__checkout__input__wrapper">
                        <label htmlFor="name">Cardholder Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="John Smith"
                            value={name}
                            className="card__checkout__input"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>

                    <CardElement className="card-element"></CardElement>

                    {!isEmpty && (
                        <div className="card__checkout__submit__wrapper">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="btn my-3 card__checkout__submit"
                            >
                                Pay ${total}
                            </button>
                        </div>
                    )}

                    <div className="card__checkout__visa">
                        <img
                            src={Visa}
                            alt="visa"
                            className="card__checkout__visa__img"
                        />
                    </div>
                </form>
            </section>
        </>
    );
}

const CardForm = injectStripe(Checkout);
const StripeWrapper = () => {
    return (
        <StripeProvider apiKey="pk_test_6GdBAnWXDZ9W4trSJcQfJt2c">
            <Elements>
                <CardForm />
            </Elements>
        </StripeProvider>
    );
};

export default StripeWrapper;
