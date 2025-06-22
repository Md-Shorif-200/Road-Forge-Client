import React from 'react';
import Navbar from '../../Components/Navbar';
import useComments from '../../Hooks/useComments';
import useAuth from '../../Hooks/useAuth';

const AllComments = () => {
      const {user} = useAuth();
      const  [Comments,isLoading,refetch] = useComments(); // tanstack query

    return (
        <div className='Common_bg_Class'>
             <Navbar></Navbar>

            
            {/* my Comments section */}
              <div className="my_comment_section w-full min-h-screen mt-2  py-10 bg-white shadow-2xl rounded-lg">

              <h1 className='text-2xl mt-4 mb-6 capitalize font-semibold px-[4%] '> All  comments ( {Comments?.length || 0 } )</h1>

                <div className="all_comments_card">
                    {
                          Comments.map((data,index) => {
                                                      
                                                              return (
                                                          <div key={index} className='card w-full px-[4%] py-6 border border-gray-300 flex justify-between items-center '>
                                                                     
                                                                     <div className="comment_info flex items-center gap-x-5">
                                                                             <div className="user_img">
                                                                                   <img src={data?.photo} alt={data?.displayName} className='w-16 h-16 rounded-full' />
                                                                             </div>
                                                                             <div className="user_comment">
                                                                                  <h3 className='text-lg font-semibold capitalize mb-1'> {data?.userName} </h3>
                                                                                  <p className='text-base capitalize text-gray-800'>{data?.comment} </p>
                                                                             </div>
                                                                     </div>
                                                        
                                                          </div>
                        
                                                         )
                                                     })
                    }
                </div>
                  
              </div>

        </div>
    );
};

export default AllComments;