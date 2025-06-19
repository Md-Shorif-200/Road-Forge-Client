import React from 'react';
import Navbar from '../../Components/Navbar';
import RoadMapItem from '../Road-map-item/RoadMapItem';

const Home = () => {
    return (
        <div className='bg-[#F2F2F2] px-60 py-10 w-full min-h-screen'>

            <Navbar></Navbar>

           <RoadMapItem></RoadMapItem>

        </div>
    );
};

export default Home;