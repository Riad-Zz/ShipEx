import React from 'react';
import logoImg  from '../../assets/logo.png'

const Logo = ({textClassName = ''}) => {
    return (
        <div className='flex items-end'>
            <img src={logoImg} alt="" />
            <p className={`font-extrabold text-3xl -ml-4 ${textClassName}`}>ShipEx</p>
        </div>
    );
};

export default Logo;