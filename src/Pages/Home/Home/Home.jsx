import React from 'react';
import Banner from '../Banner/Banner';
import Works from '../Works/Works';
import Services from '../Services/Services';
import Companies from '../Companies/Companies';
import MoreUs from '../MoreUs/MoreUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Works></Works>
            <Services></Services>
            <Companies></Companies>
            <MoreUs></MoreUs>
        </div>
    );
};

export default Home;