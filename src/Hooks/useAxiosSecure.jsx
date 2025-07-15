import axios from 'axios';
import React from 'react';

const useAxiosSecure = () => {

    const axiosPublic = axios.create({
        baseURL : 'https://road-forge-server.vercel.app/'
    })
   return axiosPublic
};

export default useAxiosSecure;


