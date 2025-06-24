import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import { IoSend } from "react-icons/io5";
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const NestedReplyForm = ({nestedReplyData,commentData,setNestedReplyId,refetch}) => {
      
    // react hook form
     const {
          register,
          handleSubmit,
          reset,
          formState: { errors, isSubmitting },
        } = useForm();


    const {user} = useAuth();    // context api
    const axiosSecure = useAxiosSecure();
         


    // handle nested reply-form 
      const onsubmit = async (data) => {
            const nestedReplyMessage = {
              commentId : commentData?._id,
              nestedReplyId : nestedReplyData?.id,
              name : user?.displayName,
              email : user?.email,
              photo : user?.photoURL,
              message : data.nestedReplyMessage,
              time : new Date()
            }

            try {
                const response = await axiosSecure.post('/api/comments',nestedReplyMessage);
                const result = response.data;
                if(result.acknowledged && result.modifiedCount > 0){

                   toast.success('your replied this comment')
                   reset();
                   setNestedReplyId(null)
                   refetch()
                   
                }
                
                
            } catch (error) {
                  toast.error(error.message)
                        setNestedReplyId(null)
            }
          
      }
    return (
        <div>
           <div className="nestedReplySection pl-[12%] flex gap-x-3 mb-6">
     
                              <div className="user_img">
                                   <img src={user?.photoURL} className="w-9 h-9  border border-gray-200 rounded-full" alt="user picture" />
                              </div>
                            {/* nested reply form */}
                            <div className='nestedReplyForm w-full'>
                                <form onSubmit={handleSubmit(onsubmit)} className="w-full relative">
          {/* teaxt area */}
          <div>

            <textarea
              type="text"
              {...register("nestedReplyMessage", { required: "This Field  is Required" })}
              className="w-full px-3 py-2 border border-gray-300 bg-[#F0F2F5]  focus:border-[#FF0070] focus:outline-[#FF0070] resize-none rounded-lg  "
              placeholder="Reply..."
               maxLength={300}
            />

            {errors.nestedReplyMessage && (
              <p className="form_error">{errors.nestedReplyMessage.message} </p>
            )}
          </div>

          {/* submit button */}

          <button
            type="submit"
            className=" cursor-pointer absolute bottom-4 right-4 text-xl text-[#FF0070]"
            // disabled={isSubmitting}
          >
            {/* {isSubmitting ? "Submitting..." : "Comment"} */}
              <IoSend></IoSend>
          </button>
                            </form>
                            </div>

                          

                          
          
                </div>
        </div>
    );
};

export default NestedReplyForm;