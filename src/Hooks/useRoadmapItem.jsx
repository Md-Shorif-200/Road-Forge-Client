import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRoadmapItem = () => {
      const axiosSecure = useAxiosSecure();

      const {data :roadmapItem = [],isLoading,refetch} = useQuery({
        queryKey : ['roadmap-item'],
        queryFn : async () => {
            const res = await axiosSecure.get('roadmap-item');
            return res.data
        }
      })


    return  [roadmapItem,isLoading,refetch]
};

export default useRoadmapItem;
