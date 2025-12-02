import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            
            <SyncLoader size={10} color='#CAEB66'/>
        </div>
    );
};

export default Loader;