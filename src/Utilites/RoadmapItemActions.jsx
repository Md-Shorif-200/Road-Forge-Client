import React from 'react';
import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

import toast from "react-hot-toast";
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useRoadmapItem from '../Hooks/useRoadmapItem';


const RoadmapItemActions = ({road_map_item}) => {

        if(!road_map_item){
            return null
        }
        
      const { _id, title, description, status, comments, upvotes, name, address } =
    road_map_item ;
    const [roadmapItem,isLoading,refetch] = useRoadmapItem()

       // call context api
    const {user} = useAuth();
    // private api
    const axiosSecure = useAxiosSecure();


    //    manage Upvote Functionality
    const handleUpvote = async (id) => {
          
        const upVoteData = {
            userName : user?.displayName,
            userEmail : user?.email,
            
        }
          try {

            // update roadmap-item data
            const response = await axiosSecure.patch(`/roadmap-item/upvote/${id}`,upVoteData);
            const upvoted = response.data;
              console.log(response.data);
               if(upvoted.acknowledged && upvoted.modifiedCount > 0){
                // refetch data
                   refetch();
                 toast.success('upvoted succesfully');
               }

            
          } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.message)
          }
              
    }



    return (
        <div>
              <div className="flex gap-x-5 items-center">

            {/* upvote icon */}
          <div className="upvote text-2xl flex gap-x-2 items-center primary_text_color cursor-pointer group transition-all" onClick={() => handleUpvote(_id)} > 
            <FaThumbsUp className="transform transition-all duration-300 group-hover:scale-150"></FaThumbsUp>{" "}
            {upvotes}
          </div>

                {/* comment icon*/}
          <div className="comment text-2xl flex gap-x-2 items-center primary_text_color cursor-pointer group transition-all">
            <FaComment className="transform transition-all duration-300 group-hover:scale-150"></FaComment>{" "}
            {comments.length}
          </div>
        </div>
        </div>
    );
};

export default RoadmapItemActions;