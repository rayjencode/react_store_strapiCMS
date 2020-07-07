import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <section className="container-fluid">
            <div className="mx-auto text-center">
                <h1 className="text-center text-uppercase fontRoboto">
                    Ops! it's a dead end
                </h1>
                <div className="mt-5">
                    <Link to="/" className="btn btn-primary ">
                        Back to Homepage
                    </Link>
                </div>
            </div>
        </section>
    );
}
