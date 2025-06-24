import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { FaComment, FaComments, FaHome } from "react-icons/fa";
import useComments from "../Hooks/useComments";
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from '../assets/road-forge_logo-removebg-preview.png'


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);

  // don't show my-comments page if user not comment any roadmap-item
  const  [Comments,isLoading,refetch] = useComments();

  const isComment = Comments.find(data => data?.userEmail === user?.email);

  // handle logout function

  const handleLogOut = () => {
    logOut();
    setIsActive(false);
  };

  return (
  <div className="sticky top-0">
      <nav className=" bg-white  rounded-md  px-4 sm:px-8 md:px-10 py-6 shadow-md relative" >
      <div className="flex justify-between items-center">
        <div className="logo flex items-center ">
               <img src={logo} alt="nav-logo" className="w-14 h-14" />
          <h1 className="font-semibold text-2xl ">
            roadForge
          </h1>
        </div>
        <div className="user_auth flex gap-x-4 justify-center items-center">
          {user ? (
            <>
              {/* user profile image */}
              <div className="flex justify-center items-center">
                <h2 className="text-lg font-semibold capitalize hidden sm:block mr-4"> {user?.displayName} </h2>

                <div
                  className="profile_img cursor-pointer flex items-center"
                  onClick={() => setIsActive(!isActive)}
                >
                  <img
                    src={user?.photoURL}
                    className="w-[50px] h-[50px] rounded-full bject-cover border border-[#FF0070]"
                    alt="User Photo"
                  />
                    <div className="dropdown_btn text-4xl">
                      <RiArrowDropDownLine></RiArrowDropDownLine>
                  </div>

                </div>
                
              </div>
   
            </>
          ) : (
            <>
              <Link to="/sign-up" className="sign_up_btn primary_btn hidden sm:block">
                sign up
              </Link>
              <Link to="/log-in" className=" primary_btn">
                Log In
              </Link>
            </>
          )}
          {/* nav card */}
          <div
            className={`nav_card   w-[70%] sm:w-[60%] md:w-[40%] lg:w-[30%] xl:w-[20%] bg-white shadow-2xl text-black capitalize  pt-6   absolute top-full  right-4 rounded-sm transition-all ${
              isActive ? "block" : "hidden"
            }`}
          >
                  <div className="flex  gap-x-3 items-center px-2 pb-4 border-b border-b-gray-200 sm:hidden">
                       <img src={user?.photoURL} className="w-10 h-10 rounded-full border border-[#FF0070] " alt="user profile img" />
                           <h2 className="text-lg font-semibold capitalize"> {user?.displayName} </h2>
                  </div>
            <ul>

                  {/* got to home */}
              <li className="text-lg font-semibold py-3  border-b border-gray-200 hover:bg-gray-200 transition-all px-4 gap-x-2">
                {" "}
                <Link className="flex items-center gap-x-3" to='/'>
                  <FaHome className="text-2xl"></FaHome>
                   Home
                </Link>{" "}
              </li>


              {/* all  comments */}
              <li className="text-lg font-semibold py-3  border-b border-gray-200 hover:bg-gray-200 transition-all px-4 gap-x-2">
                {" "}
                <Link className="flex items-center gap-x-3" to='/all-comments'>
                  <FaComments className="text-2xl"></FaComments>
                  all comments
                </Link>{" "}
              </li>
              {/* my comments */}
               {
                isComment ?
                 <>   
                 <li className="text-lg font-semibold py-3  border-b border-gray-200 hover:bg-gray-200 transition-all px-4 gap-x-2">
                {" "}
                <Link className="flex items-center gap-x-3" to='/my-comments'>
                  <FaComment className="text-2xl"></FaComment>
                  my comments
                </Link>{" "}
              </li>
                </>
                :
                  <> </>
              
               }
              {/* log out */}
              <li className="text-lg font-semibold py-3  border-b border-gray-200 hover:bg-gray-200 transition-all px-4">
                <button
                  className="flex items-center gap-x-3"
                  onClick={handleLogOut}
                >
                  <MdLogout className="text-2xl"></MdLogout>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
