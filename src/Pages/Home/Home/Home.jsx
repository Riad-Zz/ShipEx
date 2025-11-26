import React from 'react';
import Banner from '../Banner/Banner';
import Works from '../Works/Works';
import Services from '../Services/Services';
import Companies from '../Companies/Companies';
import MoreUs from '../MoreUs/MoreUs';
import Customer from '../Customer/Customer';
import Faq from '../Faq/Faq';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Works></Works>
            <Services></Services>
            <Companies></Companies>
            <MoreUs></MoreUs>
            <Customer></Customer>
            <Reviews></Reviews>
            <Faq></Faq>
        </div>
    );
};

export default Home;