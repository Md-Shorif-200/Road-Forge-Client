import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
 

            <nav className='flex justify-between px-10 py-6'>
                  <div className="logo">
                    <h1 className='font-semibold text-2xl primary_text_color'>roadForge</h1>
                  </div>
                  <div className="user_auth">  
                        <Link  to='sign-up' className="sign_up_btn primary_btn">sign up</Link>
                  </div>
            </nav>
            
    
    );
};

export default Navbar;