import React, { useState } from 'react';
import Navbar from '../../Components/Navbar';
import useComments from '../../Hooks/useComments';
import useAuth from '../../Hooks/useAuth';
import { FaDotCircle, FaEdit } from 'react-icons/fa';
import Loading from '../../Components/Loading';
import { MdDelete } from 'react-icons/md';
import CommentEditModal from './CommentEditModal';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const MyComments = () => {
      const [Comments,isLoading,refetch] = useComments();
       const  {user} = useAuth();
       const [open,setOpen] = useState(false);
       const [commentId,setCommentId] = useState('');
       const axiosSecure = useAxiosSecure();

    //    find my comments
    const myComment = Comments?.filter(comment => comment?.userEmail == user?.email);

      //  handle loading state
    if(isLoading){
          return <Loading></Loading>
    }

//  handle edit button
const handleEditBtn = async (id) => {
      //    open modal
      setOpen(true)
      // store comment id
      setCommentId(id)

      
        
}

//  handle delete button
const handleDeleteBtn = async (id) => {
      
      try {
                        Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then( async (result) => {
  if (result.isConfirmed) {
      //   send delete requiest to database
      const response = await axiosSecure.delete(`/api/comments/delete/${id}`);
      const result = response.data;
            if(result.acknowledged && result.deletedCount > 0){
                       Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
     });
                  // refetch data
                  refetch();

            }
       

  }
});
            
      } catch (error) {
           toast.error(error.message)
            
      }
        
}
   
       
    return (
         <div>
             {
                  open ?
                  //  comment edit modal
                   <>
                    <CommentEditModal setOpen={setOpen} myComment={myComment} commentId={commentId} refetch={refetch}></CommentEditModal>
                  </>

                  : 

                  <>
                                <div className='Common_bg_Class'>
             <Navbar></Navbar>

            
            {/* my Comments section */}
              <div className="my_comment_section w-full min-h-screen mt-2  py-10 bg-white shadow-2xl rounded-lg">

              <h1 className='text-2xl mt-4 mb-6 capitalize font-semibold px-[4%] text-end'> My  comments ( {myComment?.length || 0 } )</h1>

                     <div className="comment_cards">
                          {
                                myComment.map((data,index) => {
                              
                                      return (
                                  <div key={index} className='card w-full px-[4%] border border-gray-300 flex justify-between items-center '>
                                              <div className="comment_info">
                                                <h2 className='text-lg capitalize font-semibold mt-2 mb-3  flex items-center gap-x-2'>  <FaDotCircle className='text-[10px]'></FaDotCircle>  {data.roadmapItemTitle} - <span className='text-gray-600'> By {data?.roadmapAuthor} </span> </h2>

                                                <p className=' text-base capitalize font-semibold my-4'>My Comment : <span className='text-gray-700'>{data?.comment} </span> </p>
                                              </div>

                                                {/* comment action btn */}

                                                <div className="comment_action_btn flex gap-x-8 text-2xl">
                                                                        {/* edit */}
                                                                <div className="edit p-2  cursor-pointer text-[#FF0070]  " title='edit comment' onClick={() => handleEditBtn(data?._id)}>
                                                                      <FaEdit></FaEdit>
                                                                </div>

                                                                {/* delete  */}
                                                                <div className="delete p-2  cursor-pointer text-red-500  " title='delete comment' onClick={() => handleDeleteBtn(data?._id)}>
                                                                     <MdDelete></MdDelete>
                                                                </div>
                                                </div>
                                
                                  </div>

                                 )
                             })
                          }
                     </div>
              </div>

        </div>
                  </>
             }
         </div>
    );
};

export default MyComments;