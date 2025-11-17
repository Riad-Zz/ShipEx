import React from 'react';
import Banner from '../Banner/Banner';
import Works from '../Works/Works';
import Services from '../Services/Services';
import Companies from '../Companies/Companies';
import MoreUs from '../MoreUs/MoreUs';
import Customer from '../Customer/Customer';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Works></Works>
            <Services></Services>
            <Companies></Companies>
            <MoreUs></MoreUs>
            <Customer></Customer>
        </div>
    );
};

export default Home;