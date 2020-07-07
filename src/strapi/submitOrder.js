import axios from 'axios';
import URL from '../utils/URL';

async function submitOrder({ name, total, items, stripeTokenId, userToken }) {
    const response = await axios
        .post(
            `${URL}/orders`,
            {
                name,
                total,
                items,
                stripeTokenId,
                shipped: false,
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        )
        .catch((error) => console.log(error));
    console.log(response);
    return response;
}

export default submitOrder;
