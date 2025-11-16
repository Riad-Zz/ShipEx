import React from 'react';
import logoImg  from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end'>
            <img src={logoImg} alt="" />
            <p className='font-extrabold text-3xl -ml-4 text-[#303030]'>ShipEx</p>
        </div>
    );
};

export default Logo;