import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import img_1 from "../assets/form_img.png";
import useAuth from "../Hooks/useAuth";
import { sendEmailVerification } from "firebase/auth";
import toast from "react-hot-toast";
import SocailLogIn from "./SocailLogIn";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // call context api
  const { user, creatUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  //   form submit function

  const onsubmit = async (data) => {
    // user Info
    const userInfo = {
      name: data.name,
      email: data.email,
      photoUrl: data.profilePhoto,
    };

    try {
      const result = await creatUser(data.email, data.password);
      // varification email
      await sendEmailVerification(result.user);

      reset();
      toast.success("Sign Up Succssfully! cheack email for verification");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }

    console.log(data);

    reset();
  };

  return (
    <div className="primary_bg_color w-full min-h-screen flex justify-center items-center z-0 py-10 md:py-14 lg:py-20 ">

      <div className="bg-white w-[85%]  z-10 shadow-2xl grid grid-cols-1 lg:grid-cols-2">

        <div className="form_img primary_bg_color w-full flex justify-center items-center py-6 ">
          <img src={img_1} alt="form image" className="w-1/2" />
        </div>

        <div className="form_section p-6">
          <form action="" onSubmit={handleSubmit(onsubmit)}>
            {/* name */}
            <div>
              <label htmlFor="" className="block font-semibold capitalize">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is Required" })}
                className="w-full px-3 py-2  "
                placeholder="Enter Your Name"
              />

              {errors.name && (
                <p className="form_error">{errors.name.message} </p>
              )}
            </div>

            <div className="grid grid-cols-1  gap-x-2">
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
            </div>

            {/* profile photo */}
            <div>
              <label htmlFor="" className="block capitalize font-semibold">
                Profile Photo
              </label>
              <input
                type="file"
                {...register("profilePhoto", { required: "photo is Required" })}
                className="w-full px-3 py-2 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#FF0070] hover:file:bg-violet-100 dark:file:bg-violet-600 dark:file:text-violet-100 dark:hover:file:bg-violet-500 "
                placeholder="Upload Photo"
              />

              {errors.profilePhoto && <p>{errors.profilePhoto.message} </p>}
            </div>

            {/* submit button */}

            <button
              type="submit"
              className="primary_btn w-full mt-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>

            <p className="text-base capitalize sm:text-end my-2 font-semibold">
              Already have an acount ? please{" "}
              <Link to="/log-in" className="primary_text_color">
                Log In
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
    </div>
  );
};

export default SignUp;
