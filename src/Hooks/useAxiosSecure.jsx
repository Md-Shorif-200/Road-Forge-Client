import axios from 'axios';
import React from 'react';

const useAxiosSecure = () => {

    const axiosPublic = axios.create({
        baseURL : 'http://localhost:5000/'
    })
   return axiosPublic
};

export default useAxiosSecure;


