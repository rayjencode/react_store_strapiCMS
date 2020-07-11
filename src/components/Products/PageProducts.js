import React, { useContext } from 'react';
import ProductList from './ProductList';
import { ProductContext } from '../../context/products';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const PageProducts = () => {
    const { sorted, page, changePage } = useContext(ProductContext);
    return sorted[page] ? (
        <>
            <ProductList products={sorted[page]} />
            {sorted.length > 1 && (
                <article className="pagination-buttons">
                    {page > 0 && (
                        <button
                            className="prev-page-btn"
                            onClick={() => {
                                changePage(page - 1);
                            }}
                        >
                            <FaAngleDoubleLeft />
                        </button>
                    )}
                    {sorted.map((_, index) => (
                        <button
                            key={index}
                            className={` page-btn ${
                                page === index && `page-btn-current`
                            } `}
                            onClick={() => {
                                changePage(index);
                            }}
                        >
                            {index + 1}
                        </button>
                    ))}
                    {page < sorted.length - 1 && (
                        <button
                            className="next-page-btn"
                            onClick={() => {
                                changePage(page + 1);
                            }}
                        >
                            <FaAngleDoubleRight />
                        </button>
                    )}
                </article>
            )}
        </>
    ) : (
        <h5 className="search-errors">
            Unfortunately your search query did not match
        </h5>
    );
};

export default PageProducts;
