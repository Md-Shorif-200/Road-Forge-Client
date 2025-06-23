import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import img_1 from "../assets/form_img.png";
import useAuth from "../Hooks/useAuth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";
import SocailLogIn from "./SocailLogIn";
import { TbUrgent } from "react-icons/tb";
import Navbar from "../Components/Navbar";
import lottieImg from '../../src/assets/lotte react/Animation - 1750704037497.json'
import Lottie from "lottie-react";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // call context api
  const { logIn } = useAuth();

  const [loading, setLoading] = useState(true);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();
  const auth = getAuth();

  const from = location.state?.from?.pathname || "/";

  //   form submit function

  const onsubmit = async (data) => {
    // user Info
    const userInfo = {
      email: data.email,
    };

    try {
      const result = await logIn(data.email, data.password);
      reset();
      navigate(from, { replace: true });
      toast("log In Succssfully");
    } catch (error) {
      toast.error(error.message);
    }

    console.log(data);

    reset();
  };

  // forgot password Functionality

  const handleForgotPassword = async () => {
    const email = getValues("email");

    if (!email) {
      toast.error("please provide a email");
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("passwod reset email sent ! please cheack email");
    } catch (error) {
      toast.error("somthing is wrong" + error.message);
    }
  };

  return (
      <div>
        
         {/* <Navbar></Navbar> */}
   
      <div className="w-full  min-h-screen mt-6 grid  lg:grid-cols-2">
     
        <div className="log_in_form_bg flex justify-center flex-col p-[6%] sm:p-[10%] md:px-[15%] md:py-[8%] lg:px-[12%]  ">
           <div className="form_section bg-white px-4 sm:px-6 md:px-8  lg:px-10 py-10 rounded-xl">
        <form action="" onSubmit={handleSubmit(onsubmit)}>
          {/* email */}
          <div>
            <label htmlFor="" className="block font-semibold capitalize">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "email is Required" })}
              className="w-full px-3 py-2  "
              placeholder="Enter Email Adress"
            />

            {errors.email && (
              <p className="form_error">{errors.email.message} </p>
            )}
          </div>

          {/* password */}
          <div className="relative">
            <label htmlFor="" className="block font-semibold capitalize">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "password is Required",

                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                  message:
                    "Password Must Contain  1 Uppercase , 1 Lowercase, 1 number , 1 symbol and be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2  "
              placeholder="Enter Strong password "
            />

            {errors.password && (
              <p className="form_error">{errors.password.message} </p>
            )}

            <div
              className="password_toggle_icon absolute top-1/2 right-3 cursor-pointer"
              onClick={() => setshowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </div>
          </div>

          <label
            className=" capitalize text-blue-600 text-sm font-semibold "
            onClick={handleForgotPassword}
          >
            <p>Forgot Password ?</p>
          </label>

          {/* submit button */}

          <button
            type="submit"
            className="primary_btn w-full mt-3 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Log In"}
          </button>

          <p className="text-base capitalize text-end my-2 font-semibold">
            Don't have an acount ? please{" "}
            <Link to="/sign-up" className="primary_text_color">
              Creat Account
            </Link>
          </p>
        </form>

        <p className="text-lg primary_text_color text-center font-semibold capitalize mb-2">
          or
        </p>

        <div>
          <SocailLogIn></SocailLogIn>
        </div>
      </div>
        </div>
 
        <div className="form_img  bg-gray-50 w-full flex justify-center items-center  px-4 sm:px-6 md:px-8  lg:px-10">
          {/* <img src={img_1} alt="form image" className="w-1/2" /> */}
           <Lottie animationData={lottieImg}></Lottie>
        </div>
  
    </div>
      </div>
  );
};

export default LogIn;
