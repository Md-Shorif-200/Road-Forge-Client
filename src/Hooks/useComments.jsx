import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useComments = () => {
      const axiosSecure = useAxiosSecure()

      const {data : Comments = [],isLoading,refetch } = useQuery({
        queryKey : ['Comments'],
        queryFn : async() => {
             const res = await axiosSecure.get('/api/comments');
             return res.data;
        } 
      })
    return  [Comments,isLoading,refetch]
};

export default useComments;