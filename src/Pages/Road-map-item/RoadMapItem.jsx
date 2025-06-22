import React from 'react';
import useRoadmapItem from '../../Hooks/useRoadmapItem';
import RoadMapCard from './RoadMapCard';
import Loading from '../../Components/Loading';


const RoadMapItem = () => {
    const [roadmapItem,isLoading,refetch] = useRoadmapItem();
    console.log(roadmapItem);
    
    if(isLoading){
       return <Loading></Loading>
    }

    
    return (
        <div className='mt-4'>

          <div className='grid grid-cols-2 gap-6'>
                {
                    roadmapItem.map((item) => {

                      return    <RoadMapCard  key={item?._id} road_map_item={item} isLoading={isLoading}></RoadMapCard>
                    })
                }
          </div>
            
        </div>
    );
};

export default RoadMapItem;