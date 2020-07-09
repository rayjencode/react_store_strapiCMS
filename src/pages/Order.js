import React, { useContext } from 'react';
import Loading from '../components/Loading';
import { OrderContext } from '../context/order';
import { UserContext } from '../context/user';

const Order = () => {
    const { loading, orders } = useContext(OrderContext);
    const { user } = useContext(UserContext);

    let myOrderList = [...orders].filter((item) => item.user.id === user.id);

    const myOrders = myOrderList.map((item) => {
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

    return loading ? (
        <Loading />
    ) : (
        <>
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
                    {myOrders}
                </table>
            </div>
        </>
    );
};

export default Order;
