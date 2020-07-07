import React from 'react';
import loading from '../assets/loading3.gif';

export default function Loading() {
    return (
        <section className="container-fluid">
            <div className="loading text-center">
                <img className="loading-img" src={loading} alt="loading" />
                {/* <h4>Loading...</h4> */}
            </div>
        </section>
    );
}
