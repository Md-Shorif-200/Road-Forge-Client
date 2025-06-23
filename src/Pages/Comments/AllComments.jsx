import React, { useState } from "react";
import Navbar from "../../Components/Navbar";
import useComments from "../../Hooks/useComments";
import useAuth from "../../Hooks/useAuth";
import { FaReply } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import toast from "react-hot-toast";
import ReplyMessage from "./ReplyMessage/ReplyMessage";

const AllComments = () => {
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
    } = useForm();

  const { user } = useAuth();
  const [Comments, isLoading, refetch] = useComments(); // tanstack query
  const axiosSecure = useAxiosSecure();
  const [replyFormId,setReplyFormId] = useState(null)
  const [replyMessageId , setShowReplyMessageId] = useState(null)
  // const [shwoReplies,setShowReplies] = useState(false)


  if(isLoading){
     return <Loading></Loading>
  }

  // reply btn functionality
    const handleReplayBtn = (id) => {
        if(replyFormId === id){
            setReplyFormId(null)
        }else{
          setReplyFormId(id)
        }
    }

    // reply message button

    const handleReplyShowButton = (id) => {
         if(replyMessageId === id){
           setShowReplyMessageId(null)
         }else{
          setShowReplyMessageId(id)
         }
    }


    // handle reply form function 

    const onsubmit = async(data) => {
               console.log(data);
               
           const replyInfo = {
              replyId : replyFormId,
              name : user?.displayName,
              email : user?.email,
              photo : user?.photoURL,
              replyMessage : data.replyMessage,
              time : new Date()
           }

           try {
                  // send reply message data to database comment collection
            const response = await axiosSecure.post('/api/comments',replyInfo);
            const result = response.data;
            if(result.acknowledged && result.modifiedCount > 0){
                toast.success('you reply to this message')
                reset();
                setReplyFormId(null);
                refetch();
            }
              
            
           } catch (error) {
              toast.error(error.message)
            
           }finally{
              reset();
              setReplyFormId(null)
           }


            
    }

  return (
    <div className="Common_bg_Class">
      <Navbar></Navbar>

      {/* my Comments section */}
      <div className="my_comment_section w-full min-h-screen mt-2  py-10 bg-white shadow-2xl rounded-lg">
        <h1 className="text-xl sm:text-2xl mt-0 sm:mt-2 md:mt-4 mb-6 capitalize font-semibold px-[4%] ">
          {" "}
          All comments ( {Comments?.length || 0} )
        </h1>

        <div className="all_comments_card">
          {Comments.map((data, index) => {
            return (
                <div  key={index} className="w-full px-[2%] sm:px-[4%] pt-3 sm:pt-4 md:pt-6  sm:pb-3 border border-gray-200">
                      {/* comments section */}
   
                <div className="comment_card flex  " >
                      {/* img */}
                  <div className="user_img">
                    <img
                      src={data?.photo}
                      alt={data?.displayName}
                      className="w-10 sm:w-12 md:w-14 lg:w-16 h-10 sm:h-12 md:h-14 lg:h-16 mt-3 rounded-full border border-gray-300"
                    />
                  </div>
                    {/* comments */}
                  <div className="user_comment w-full  pl-2  sm:pl-4 py-0">
                              <div className="comment bg-[#F0F2F5] rounded-lg p-2">
                 <h3 className="text-lg font-semibold capitalize mb-1">
                      {" "}
                      {data?.userName}{" "}
                    </h3>
                    <p className="text-base capitalize text-gray-800">
                      {data?.comment}{" "}
                    </p>
                              </div>

                                      {/* comment reply button  */}
                <div className="comment_reply_btn  mr-2 flex justify-between mt-1  ">
                          <div className="flex gap-x-6 ">
                               <p className="text-sm sm:text-base capitalize font-semibold">1 day ago</p>
                  <a  className="capitalize font-semibold text-sm sm:text-base cursor-pointer hover:underline" onClick={() => handleReplayBtn(data?._id)}> reply</a>
                          </div>
                          {/* show reply button */}
                          <div className="show_replies">
                                <button  className=" text-sm sm:text-base font-semibold capitalize hover:underline" disabled={!data.replies} onClick={() => handleReplyShowButton(data?._id)}> replies  {data?.replies?.length || 0} </button>
                          </div>
                </div>
                  
                  </div>
                </div>


                  {/* reply form */}
                <div className="replyForm ml-8 sm:ml-10 md:ml-18 lg:ml-22 xl:ml-28 flex gap-x-3 mt-6">
                    {
                       replyFormId === data?._id ?
                        <>
                              <div className="user_img">
                                   <img src={user?.photoURL} className="w-10 h-10  border border-gray-200 rounded-full" alt="user picture" />
                              </div>
                         <form onSubmit={handleSubmit(onsubmit)} className="w-full relative">
          {/* teaxt area */}
          <div>

            <textarea
              type="text"
              {...register("replyMessage", { required: "This Field  is Required" })}
              className="w-full px-3 py-2 border border-gray-300 bg-[#F0F2F5]   focus:border-[#FF0070] focus:outline-[#FF0070] resize-none rounded-lg  "
              placeholder="Reply..."
               maxLength={300}
            />

            {errors.replyMessage && (
              <p className="form_error">{errors.replyMessage.message} </p>
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

                          
                          </> : 

                          <></>
                    }
                </div>

                {/* show all replies */}

                      <div className="show replies">
                         {
                            replyMessageId === data?._id &&  <ReplyMessage commentData = {data} ></ReplyMessage>
                         }
                      </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllComments;
