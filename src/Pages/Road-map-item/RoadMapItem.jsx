import React, { useState } from 'react';
import useRoadmapItem from '../../Hooks/useRoadmapItem';
import RoadMapCard from './RoadMapCard';
import Loading from '../../Components/Loading';


const RoadMapItem = () => {
     const [filter,setFilter] = useState('allItem');
     const [sort,setSort] = useState('');
    const [roadmapItem,isLoading,refetch] = useRoadmapItem(filter,sort);

    
    if(isLoading){
       return <Loading></Loading>
    }

    const handleResetBtn = () => {
       setFilter('allItem');
       setSort('')
    }

    
    return (
        <div className='mt-2'>

          <div className='w-full mb-3 roadmap_action_controls bg-white shadow-sm px-4 py-8 rounded-md  flex justify-end gap-x-4'>
            {/* filter  */}
               <div className="filter_btn">
                      <select name="" id="" className='w-52 text-lg capitalize border-[2px] focus:outline-[#FF0070] border-[#FF0070] p-2 rounded-sm font-semibold cursor-pointer' defaultValue='Filter By Catagory' onChange={(e) => setFilter(e.target.value)}>
                           <option value="Filter By Catagory" disabled>Filter By Catagory</option>
                           <option  value="Planned">Planned</option>
                           <option  value="In Progress"> In Progress</option>
                           <option  value="Completed"> Completed</option>
                      </select>
               </div>
               {/* sort button */}
               <div className="sort_btn bg-[#FF0070] p-2  text-white font-semibold rounded-sm ">
                    <button className='uppercase px-2 cursor-pointer' onClick={() => setSort('upvote')}> Sort By Upvote</button>
               </div>

                {/* reset button */}
               <div className="sort_btn bg-[#FF0070] p-2  text-white font-semibold rounded-sm ">
                    <button className='uppercase px-2 cursor-pointer' onClick={handleResetBtn}> Reset</button>
               </div>


          </div>

          <div className='grid grid-cols-2 gap-6'>
                {
                    roadmapItem.map((item) => {

                      return    <div className=''><RoadMapCard  key={item?._id} road_map_item={item} isLoading={isLoading}></RoadMapCard></div>
                    })
                }
          </div>
            
        </div>
    );
};

export default RoadMapItem;