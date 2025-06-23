import React from 'react';

const NestedReplyCard = ({nestedReplyData}) => {
    return (
        <div className='w-full pl-[15%] '>
          <div className="card bg-[#F0F2F5] flex gap-x-3 rounded-md   p-3  mb-4">
               <div className="img">
                <img src={nestedReplyData?.photo} alt={nestedReplyData?.name} className='w-9 h-9 rounded-full border border-gray-200' />  
             </div>    
             <div className="message">
                  <h3 className='text-[12px] capitalize font-bold'>  {nestedReplyData?.name} </h3>
                  <p className='text-sm capitalize text-gray-800'> {nestedReplyData?.message} </p>
             </div>
          </div>
        </div>
    );
};

export default NestedReplyCard;