import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRoadmapItem = (filter = 'allItem', sort = '') => {
      const axiosSecure = useAxiosSecure();

      const {data :roadmapItem = [],isLoading,refetch} = useQuery({
        queryKey : ['roadmap-item',filter,sort],
        queryFn : async () => {
            const res = await axiosSecure.get(`/roadmap-item?filter=${filter}&sort=${sort}`);
            return res.data
        }
      })


    return  [roadmapItem,isLoading,refetch]
};

export default useRoadmapItem;
