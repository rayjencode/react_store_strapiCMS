import React from 'react';

const Hero = ({ children }) => {
    return (
        <div className="hero">
            <div className="banner">
                <h1>BETRUE 2020 COLLECTION</h1>
                <p>
                    featuring icons that mark the next step in our individual
                    and collective hourneys
                </p>
                {children}
            </div>
        </div>
    );
};

export default Hero;
