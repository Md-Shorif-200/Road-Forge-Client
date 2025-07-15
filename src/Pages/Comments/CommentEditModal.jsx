import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdCancel, MdClose } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CommentEditModal = ({setOpen,myComment, commentId, refetch}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  

  const {user} = useAuth(); // context api
  const axiosSecure = useAxiosSecure(); // private api
  const navigate = useNavigate();
  
  //  get my Comment data for editing
  const singleComment = myComment?.find((data => data._id === commentId));
  
  const [editComment,setEditComment] = useState(singleComment?.comment) // store current comment
 

  //   handle modal form
  const onsubmit = async (data) => {
      const editCommentData = {
          commentId : commentId,
           userEmail : user?.email,
            updatedComment : data.editComment

      }

      try {
                const response = await axiosSecure.patch(`/api/comments/edit/${commentId}`,editCommentData);
                const result = response.data;
                            if(result.acknowledged && result.modifiedCount > 0){
                                  toast.success('comment successfully updated!');
                                  reset() // reset form
                                  navigate('/my-comments') // navigate to my-comments page
                                  refetch() // refetch updated data
                            }
                
      } catch (error) {
   
        toast.error('something is wring. please try again!')
        
      }finally{
        // close modal
        setOpen(false)
        // reset form
        reset()
      }

   
  };


  return (
    <div className="w-full min-h-screen fixed inset-0 bg-black/80 flex justify-center items-center z-30 ">
      <div className="comment_modal_form w-[80%]  sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto bg-white shadow-md text-black p-8 rounded-xl z-40 relative">
        <form onSubmit={handleSubmit(onsubmit)}>
          {/* teaxt area */}
          <div>
            <label className="block font-semibold capitalize text-2xl mb-5">
              Edit Comment
            </label>

            <textarea
              type="text"
              {...register("editComment", { required: "This Field  is Required" })}
              className="w-full px-3 py-2 border border-black/30  focus:border-[#FF0070] focus:outline-[#FF0070] resize-none  "
              placeholder="Say Something..."
               maxLength={300}
               value={editComment}
               onChange={(e) => setEditComment(e.target.value)}
            />

            {errors.editComment && (
              <p className="form_error">{errors.editComment.message} </p>
            )}
          </div>

          {/* submit button */}

          <button
            type="submit"
            className="primary_btn w-full mt-3 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Edit "}
          </button>
        </form>

        {/* mocal close button */}
        <div
          className="modal_close_icon absolute top-1/8 right-1/12 cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <MdClose className="text-4xl"></MdClose>
        </div>
      </div>
    </div>
  );
};

export default CommentEditModal;
