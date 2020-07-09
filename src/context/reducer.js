import { REMOVE, INCREASE, DECREASE, ADDTOCART, CLEARCART } from './actions';

export default (state, action) => {
    switch (action.type) {
        case REMOVE:
            return state.filter((item) => item.id !== action.payload);
        case INCREASE:
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, amount: item.amount + 1 }
                    : { ...item }
            );
        case DECREASE:
            return state.map((item) =>
                item.id === action.payload
                    ? { ...item, amount: item.amount - 1 }
                    : { ...item }
            );
        case ADDTOCART:
            const { id, title, price, image } = action.payload;

            let newItem = {
                id,
                title,
                price,
                image,
                amount: 1,
            };
            return [...state, newItem];
        case CLEARCART:
            return [];

        default:
            return state;
    }
};
