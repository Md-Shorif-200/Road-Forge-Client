import React, { useState } from "react";
import NestedReplyForm from "./NestedReplyForm";
import NestedReplyCard from "./NestedReplyCard";

const ReplyMessage = ({ commentData, refetch }) => {
  const replies = commentData.replies; // get replyMessage Data

  const [nestedReplyId, setNestedReplyId] = useState(null);
  const [showNestedReplyCard, setShowNestedReplyCard] = useState(null);

  // nested-reply function
  const handleNestedReplayBtn = (id) => {
    if (nestedReplyId === id) {
      setNestedReplyId(null);
    } else {
      setNestedReplyId(id);
    }
  };

  // show nested_reply_card
  const showNestedReplies = (id) => {
    if (showNestedReplyCard === id) {
      setShowNestedReplyCard(null);
    } else {
      setShowNestedReplyCard(id);
    }
  };

  return (
    <div className="pl-[12%]">
      {/* reply message card */}
      {replies.map((data) => {
        return (
          <div key={data.id}>
            <div className="reply_message_card flex  gap-x-3 mb-5">
              <div className="photo">
                <img
                  src={data?.photo}
                  alt={data?.name}
                  className="w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 rounded-full border border-gray-300"
                />
              </div>
              <div className="reply_message w-full ">
                <div className="message bg-[#F0F2F5] p-2 rounded-xl">
                  <h2 className="name text-[14px] capitalize font-semibold">
                    {" "}
                    {data?.name}{" "}
                  </h2>
                  <p className="text-base capitalize text-gray-700">
                    {" "}
                    {data?.replyMessage}{" "}
                  </p>
                </div>

                {/*  nested reply button  */}
                <div className="  mr-2 flex justify-between mt-1  ">
                  <div className="flex gap-x-6  ">
                    <p className=" font-semibold text-sm lowercase">
                    </p>
                    <a
                      className="capitalize text-sm font-semibold  cursor-pointer hover:underline"
                      onClick={() => handleNestedReplayBtn(data?.id)}
                    >
                      {" "}
                      reply
                    </a>
                  </div>
                  {/* show nested-reply button */}
                  <div className="show_replies">
                    <a
                      className="font-semibold capitalize hover:underline text-sm cursor-pointer"
                      onClick={() => showNestedReplies(data?.id)}
                    >
                      {" "}
                      replies ({data.nestedReplies?.length || 0}){" "}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* nested reply section  */}

            <div className="nested_reply_form">
              {nestedReplyId === data?.id ? (
                <>
                  <NestedReplyForm
                    commentData={commentData}
                    nestedReplyData={data}
                    setNestedReplyId={setNestedReplyId}
                    refetch={refetch}
                  ></NestedReplyForm>
                </>
              ) : (
                <></>
              )}
            </div>

            {/* nested_reply_card */}
            <div>
              {showNestedReplyCard === data?.id ? (
                <>
                  <div className=" ">
                    {data.nestedReplies.map((nestedReplyData, index) => (
                      <NestedReplyCard
                        key={index}
                        nestedReplyData={nestedReplyData}
                      ></NestedReplyCard>
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReplyMessage;
