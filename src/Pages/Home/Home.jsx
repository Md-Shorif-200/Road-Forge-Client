import React from 'react';
import Navbar from '../../Components/Navbar';
import RoadMapItem from '../Road-map-item/RoadMapItem';

const Home = () => {
    return (
        <div className='Common_bg_Class'>

            <Navbar></Navbar>

           <RoadMapItem></RoadMapItem>

        </div>
    );
};

export default Home;