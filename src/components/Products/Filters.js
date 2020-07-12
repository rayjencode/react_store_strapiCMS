import React, { useContext } from 'react';
import { ProductContext } from '../../context/products';

const Filters = () => {
    const {
        filters: { search, category, shipping, price },
        sorted,
        updateFilters,
        products,
    } = useContext(ProductContext);

    const productCat = products.map((item) => item.category);
    const newProCat = [...new Set(productCat)];

    return (
        <>
            <h2 className="my-2 text-center fontRoboto text-uppercase">
                Search Products
            </h2>
            <div className="filters-section">
                <form className="filters-form">
                    <div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search here..."
                                className="form-control"
                                name="search"
                                value={search}
                                onChange={updateFilters}
                            />
                        </div>
                        <div className="form-group">
                            <div>
                                <input
                                    className="mr-2"
                                    type="checkbox"
                                    id="shipping"
                                    name="shipping"
                                    checked={shipping}
                                    onChange={updateFilters}
                                />
                                <label htmlFor="shipping">Free Shipping</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category" className="mr-3">
                                Category
                            </label>
                            <select
                                name="category"
                                id="category"
                                className="form-control"
                                value={category}
                                onChange={updateFilters}
                            >
                                <option value="all">All</option>
                                {newProCat.map((item, index) => (
                                    <option
                                        className="text-capitalize"
                                        key={index}
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="form-group-right">
                            <input
                                type="radio"
                                name="price"
                                value="all"
                                checked={price === 'all'}
                                className="mr-1"
                                onChange={updateFilters}
                            />
                            <label>All</label>
                        </div>
                        <div className="form-group-right">
                            <input
                                type="radio"
                                name="price"
                                value="0"
                                checked={price === 0}
                                className="mr-1"
                                onChange={updateFilters}
                            />
                            <label>$0 - $300</label>
                        </div>
                        <div className="form-group-right">
                            <input
                                type="radio"
                                name="price"
                                value="300"
                                checked={price === 300}
                                className="mr-1"
                                onChange={updateFilters}
                            />
                            <label>$300 - $650</label>
                        </div>
                        <div className="form-group-right">
                            <input
                                type="radio"
                                name="price"
                                value="650"
                                checked={price === 650}
                                className="mr-1"
                                onChange={updateFilters}
                            />
                            <label>Over $650</label>
                        </div>
                    </div>
                </form>

                <h6 className="my-5">
                    Products Results: {sorted.flat().length}
                </h6>
            </div>
        </>
    );
};

export default Filters;
