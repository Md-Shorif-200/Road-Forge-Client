import React from 'react';
import { FaCommentAlt, FaThumbsUp } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa6';

const RoadMapCard = ({road_map_item}) => {
            const {_id,title,description,status,comments,upvotes}  = road_map_item;
       
    return (
        <div className='bg-white text-black px-4 py-3 rounded-md'>


            {/* status &  title  */}
                <div className="status_badge w-[100px] text-center">
                      <p className={`text-sm font-semibold py-1 text-white rounded-lg ${status == "Planned" ? "bg-orange-400" : status == "In Progress" ? "bg-blue-400" : "bg-green-400" }`}>  {status} </p>
                </div>
              <h1 className='text-lg font-semibold  capitalize mt-2'> {title} </h1>
              <p  className='text-base lowercase text-gray-600 py-3'> {description.slice(0,140)}... </p>

              {/* roadmap action section */}

              <div className=' roadmap_actions  my-3 flex justify-between items-center'>
                
                        <div className='flex gap-x-5 items-center'>
                             <div className="upvote text-2xl flex gap-x-2 items-center primary_text_color">
                          <FaThumbsUp></FaThumbsUp> {upvotes}
                     </div>

                    <div className="comment text-2xl flex gap-x-2 items-center primary_text_color">
                          <FaComment></FaComment> {comments.length}
                     </div>
                        </div>

                        <div className="details_buttn">
                               <button className="secondary_btn">details</button>
                        </div>
              </div>
            
        </div>
    );
};

export default RoadMapCard;