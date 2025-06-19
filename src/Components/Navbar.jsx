import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  console.log(user);

  return (
    <nav className=" bg-white  rounded-md flex justify-between px-10 py-6 shadow-md">
      <div className="logo">
        <h1 className="font-semibold text-2xl primary_text_color">roadForge</h1>
      </div>
      <div className="user_auth flex gap-x-4 justify-center items-center">
        {user ? (
          <>
                 <div>
                   <img src={user?.photoURL} className="w-[50px] h-[50px] rounded-full bject-cover border border-amber-300" alt="User Photo" />
                 </div>
                <div>
                    <button className="primary_btn" onClick={logOut}>
              Log Out
            </button>
                </div>
          </>
        ) : (
          <>
            <Link to="sign-up" className="sign_up_btn primary_btn">
              sign up
            </Link>
            <Link to="log-in" className=" primary_btn">
              Log In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
