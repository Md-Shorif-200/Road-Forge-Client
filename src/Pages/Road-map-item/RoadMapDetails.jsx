import React from 'react';
import { useParams } from 'react-router-dom';
import { FaCommentAlt, FaDotCircle, FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import useRoadmapItem from '../../Hooks/useRoadmapItem';
import Navbar from '../../Components/Navbar';
import RoadmapItemActions from '../../Utilites/RoadmapItemActions';
import Loading from '../../Components/Loading';

const RoadMapDetails = () => {
      const {id} = useParams();
      const [roadmapItem,isLoading,refetch] = useRoadmapItem();

      const myRoadMapData = roadmapItem.find(item => item?._id == id);

      // handle loading state
       if(isLoading){
         return <Loading></Loading>
       }

      
    return (
        <div className='bg-[#F2F2F2] px-48 py-10 w-full min-h-screen'>
            <Navbar></Navbar>

            <div className="road_map_details w-full bg-white shadow-sm py-10 mt-4">
                      {/* status &  title  */}
                                    <div className='flex justify-between items-center px-10'>
                                        <div className="status_badge   w-[15%] text-center">
                                          <p className={`text-sm font-semibold py-1.5 text-white rounded-lg ${myRoadMapData?.status == "Planned" ? "bg-orange-400" : myRoadMapData?.status == "In Progress" ? "bg-blue-400" : "bg-green-400" }`}>  {myRoadMapData?.status} </p>
                                    </div>
                                      <div className="upvote_count">
                                             <p className="text-gray-600 font-bold text-lg"> Total Upvotes : {myRoadMapData?.upvotes} </p>
                                      </div>
                                    </div>
                                  <h1 className='text-2xl  px-10 font-semibold  capitalize mt-2'> {myRoadMapData?.title} </h1>
                                  <p  className='text-base  px-10 lowercase text-gray-600 py-3'> {myRoadMapData?.description} </p>

                                    {/* Features  */}

                                      <div className="features px-10">
                                           <h1 className='text-lg capitalize font-semibold'> Key Features </h1>
                                                <div>
                                                    {
                                                        myRoadMapData?.keyFeatures?.map((features,index) => {
                                                             return  <p key={index} className='flex gap-2 items-center text-gray-800'> <span className='text-[6px]'> <FaDotCircle></FaDotCircle> </span> {features} </p>
                                                        })
                                                    }
                                                </div>
                                      </div>

                                        {/* next-target  */}

                                      <div className="next_target px-10 mt-6">
                                           <h1 className='text-lg capitalize font-semibold'> Next Target </h1>
                                                <div>
                                                    {
                                                        myRoadMapData?.nextTarget?.map((next_target,index) => {
                                                             return  <p key={index} className='flex gap-2 items-center text-gray-800'> <span className='text-[6px]'> <FaDotCircle></FaDotCircle> </span> {next_target} </p>
                                                        })
                                                    }
                                                </div>
                                      </div>
                    

                                    <hr  className='mt-4 my-6  text-gray-300'/>
                                  {/* roadmap action  */}

                                               <div className=' roadmap_actions  px-10  my-3 flex justify-between items-center'>
                                    
                                            <div className='flex gap-x-5 items-center'>

                                                <RoadmapItemActions road_map_item={myRoadMapData}></RoadmapItemActions>
                                            
                                            </div>
                    
                                           
                                  </div>


            </div>
        </div>
    );
};

export default RoadMapDetails;