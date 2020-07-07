import React, { useContext } from 'react';
import { OrderContext } from '../context/order';
import { UserContext } from '../context/user';

const Order = () => {
    const { loading, orders } = useContext(OrderContext);
    const { user } = useContext(UserContext);

    console.log(orders);
    // console.log(user);

    const userId = user.id;

    // const userOrders = orders.find((item) => item.user.id === parseInt(userId));

    const myOrder = orders.map((item) => {
        return (
            <tbody key={item.id}>
                <tr>
                    <td>{item.created_at}</td>
                    <td>{item.name}</td>
                    <td>{item.total}</td>
                </tr>
            </tbody>
        );
    });

    return (
        <div className="container-fluid">
            <h2 className="text-center text-uppercase fontRoboto mb-5">
                My Order
            </h2>

            <table>
                <tbody>
                    <tr>
                        <th>Date Order</th>
                        <th>Name</th>
                        <th>Total</th>
                    </tr>
                </tbody>

                {myOrder}
            </table>
        </div>
    );
};

export default Order;
