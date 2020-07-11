// helper functions
// import URL from './URL';

export const flattenProducts = (data) => {
    return data.map((item) => {
        // let image = `${URL}${item.image.url}`;
        let image = (item.image && item.image.url) || null;

        return { ...item, image };
    });
};

export const featuredProducts = (data) => {
    return data.filter((item) => item.featured === true);
};

export const paginate = (products) => {
    const itemsPerPage = 3;
    const numberOfPages = Math.ceil(products.length / itemsPerPage);

    // const newProducts = Array.from({ length: numberOfPages }, () => {
    //     return products.splice(0, itemsPerPage);
    // });

    const newProducts = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage;
        return products.slice(start, start + itemsPerPage);
    });

    console.log(newProducts);

    return newProducts;
};
