import React, { useState } from 'react';
import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

import toast from "react-hot-toast";
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useRoadmapItem from '../Hooks/useRoadmapItem';
import CommentModal from '../Pages/Road-map-item/CommentModal';
import useComments from '../Hooks/useComments';


const RoadmapItemActions = ({road_map_item}) => {

        if(!road_map_item){
            return null
        }
    
        
      const { _id, title, description, status, comments, upvotes, name, address } =
    road_map_item ;
    
    const [roadmapItem,isLoading,refetch] = useRoadmapItem();
    const  [Comments] = useComments()
    
    // call context api
    const {user} = useAuth();
    // private api
    const axiosSecure = useAxiosSecure();
    // modal state
    const [modalOpen , setModalOpen] = useState(false);
  

    //    manage Upvote Functionality
    const handleUpvote = async (id) => {

      //  if user not log in 
          if(!user){
            return toast.error('your are not loged in.')
          }
          
          const upVoteData = {
            userName : user?.displayName,
            userEmail : user?.email,
            
          }
          

      
          try {

            // update roadmap-item data
            const response = await axiosSecure.patch(`/roadmap-item/upvote/${id}`,upVoteData);
            const upvoted = response.data;
      
               if(upvoted.acknowledged && upvoted.modifiedCount > 0){
                // refetch data
                   refetch();
                 toast.success('upvoted succesfully');
               }

            
          } catch (error) {
         
            toast.error(error.response.data.message)
          }
              
    }

    // manage commentModal 
     const handleCommentModal = () => {
          //  if user not log in 
          if(!user){
            return toast.error('your are not loged in.')
          }

          setModalOpen(true)
     }

    //  store total comment length
         const getTotalCommets = (comment_item) => {
                let total = 1;
                    if(comment_item?.replies && comment_item?.replies?.length > 0){
                            total = total + comment_item?.replies?.length;
                    }
                    comment_item?.replies?.forEach(reply => {
                          if(reply?.nestedReplies && reply?.nestedReplies?.length > 0){
                              total = total + reply?.nestedReplies?.length
                          }
                    });

                    return total;
              } 

              // get total comments 
    const totalComments = Comments.filter(data => data.road_map_item_id == _id).map((comment => getTotalCommets(comment))).reduce((a,b) => a + b,0);
  

      
      



    return (
        <div>
             {
                 modalOpen  ? 
                  <>
                  {/* Comment Modal */}
                        <CommentModal setModalOpen={setModalOpen} road_map_item ={road_map_item} ></CommentModal>
                  </>
                  :

                <>
                {/* roadmap action buttons */}
                 <div className="flex gap-x-5 items-center">

            {/* upvote icon */}
          <div className="upvote text-2xl flex gap-x-2 items-center primary_text_color cursor-pointer group transition-all" onClick={() => handleUpvote(_id)} > 
            <FaThumbsUp className="transform transition-all duration-300 group-hover:scale-150"></FaThumbsUp>{" "}
            {upvotes}
          </div>

                {/* comment icon*/}
          <div className="comment text-2xl flex gap-x-2 items-center primary_text_color cursor-pointer group transition-all" onClick={handleCommentModal} >
            <FaComment className="transform transition-all duration-300 group-hover:scale-150"></FaComment>{" "}
                    {totalComments || 0}
          </div>
              </div>
                
                </>
             }
        </div>
    );
};

export default RoadmapItemActions;