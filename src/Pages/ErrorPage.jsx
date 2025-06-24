import React from 'react';
import errorImg from '../../src/assets/404-error-with-icon-tab-wedsite-error_114341-27.avif'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className=' w-full min-h-screen flex justify-center flex-col items-center'>

            <img src={errorImg} className='w-[30%]' alt="error image" />
                    
                    <Link to='/' className='primary_btn mt-4'> got to home</Link>
            
        </div>
    );
};

export default ErrorPage;