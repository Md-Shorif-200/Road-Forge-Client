import React from "react";
import { useForm } from "react-hook-form";
import { MdCancel, MdClose } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CommentModal = ({ setModalOpen , road_map_item}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  //  context api
   const {user} = useAuth();
  //  private api
   const axiosSecure = useAxiosSecure();

  //   handle modal formF
  const onsubmit = async (data) => {
        const commentInfo = {
             commentId : road_map_item?._id,
             userName : user?.displayName,
             userEmail : user?.email,
             comment  : data.comment
        }

        try {
          // send comment info to database
           const response = await axiosSecure.post(`/api/comments`,commentInfo);
            const result = response.data;
            if(result.acknowledged && result.insertedId){
              //  show  toast success message
              toast.success('You have successfully commented')
            }
           
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }finally{
          // reset form
          reset();
          // close modal
          setModalOpen(false)
        }
  };


  return (
    <div className="w-full min-h-screen fixed inset-0 bg-black/80 flex justify-center items-center z-30 ">
      <div className="comment_modal_form w-[80%]  sm:w-[70%] md:w-[60%] lg:w-[40%] xl:w-[30%] h-auto bg-white shadow-md text-black p-8 rounded-xl z-40 relative">
        <form onSubmit={handleSubmit(onsubmit)}>
          {/* teaxt area */}
          <div>
            <label className="block font-semibold capitalize text-2xl mb-5">
              Your Feedback
            </label>

            <textarea
              type="text"
              {...register("comment", { required: "This Field  is Required" })}
              className="w-full px-3 py-2 border border-black/30  focus:border-[#FF0070] focus:outline-[#FF0070] resize-none  "
              placeholder="Say Something..."
            />

            {errors.comment && (
              <p className="form_error">{errors.comment.message} </p>
            )}
          </div>

          {/* submit button */}

          <button
            type="submit"
            className="primary_btn w-full mt-3 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Comment"}
          </button>
        </form>

        {/* mocal close button */}
        <div
          className="modal_close_icon absolute top-1/8 right-1/12 cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <MdClose className="text-4xl"></MdClose>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
