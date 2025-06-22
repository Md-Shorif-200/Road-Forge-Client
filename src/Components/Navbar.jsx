import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { FaComment, FaComments, FaHome } from "react-icons/fa";
import useComments from "../Hooks/useComments";

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
    <nav className=" bg-white  rounded-md  px-10 py-6 shadow-md relative">
      <div className="flex justify-between">
        <div className="logo">
          <h1 className="font-semibold text-2xl primary_text_color">
            roadForge
          </h1>
        </div>
        <div className="user_auth flex gap-x-4 justify-center items-center">
          {user ? (
            <>
              {/* user profile image */}
              <div className="flex justify-center items-center gap-x-3">
                <h2 className="text-lg font-semibold capitalize"> {user?.displayName} </h2>

                <div
                  className="profile_img cursor-pointer"
                  onClick={() => setIsActive(!isActive)}
                >
                  <img
                    src={user?.photoURL}
                    className="w-[50px] h-[50px] rounded-full bject-cover border border-[#FF0070]"
                    alt="User Photo"
                  />
                </div>
              </div>
              <div></div>
            </>
          ) : (
            <>
              <Link to="/sign-up" className="sign_up_btn primary_btn">
                sign up
              </Link>
              <Link to="/log-in" className=" primary_btn">
                Log In
              </Link>
            </>
          )}
          {/* nav card */}
          <div
            className={`nav_card   lg:w-[20%] bg-white shadow-2xl text-black capitalize  pt-6   absolute top-full  right-4 rounded-sm transition-all ${
              isActive ? "block" : "hidden"
            }`}
          >
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
  );
};

export default Navbar;
