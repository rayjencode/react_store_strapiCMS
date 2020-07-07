// helper functions
import URL from './URL';

export const flattenProducts = (data) => {
    return data.map((item) => {
        let image = `${URL}${item.image.url}`;

        return { ...item, image };
    });
};

export const featuredProducts = (data) => {
    return data.filter((item) => item.featured === true);
};
