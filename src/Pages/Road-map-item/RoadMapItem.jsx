import React from 'react';
import useRoadmapItem from '../../Hooks/useRoadmapItem';
import RoadMapCard from './RoadMapCard';


const RoadMapItem = () => {
    const [roadmapItem,isLoading,refetch] = useRoadmapItem();
    console.log(roadmapItem);
    

    
    return (
        <div className='mt-4'>

          <div className='grid grid-cols-2 gap-6'>
                {
                    roadmapItem.map((item) => {

                      return    <RoadMapCard  key={item?._id} road_map_item={item}></RoadMapCard>
                    })
                }
          </div>
            
        </div>
    );
};

export default RoadMapItem;