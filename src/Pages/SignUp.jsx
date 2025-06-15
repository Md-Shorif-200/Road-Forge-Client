import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import img_1 from '../assets/form_img.png'

const SignUp = () => {
     const {
    register,
    handleSubmit,
    reset,
    formState: { errors,isSubmitting },
  } = useForm();


//   password toogle icon
  const [showPassword,setshowPassword] = useState(false);

  console.log(showPassword);
  


//   form submit function

const onsubmit = (data) => {
      console.log(data);

      reset()
      
}


    return (
        <div className='primary_bg_color w-full min-h-screen flex justify-center items-center z-0'>

                <div className='bg-white w-[85%] h-[85vh] z-10 shadow-2xl grid grid-cols-2'>
                      <div className="form_img primary_bg_color w-full flex justify-center items-center">
                                    <img src={img_1} alt="form image" className='w-1/2' />
                      </div>
                      <div className="form_section p-6">
                            <form action="" onSubmit={handleSubmit(onsubmit)}>
                                        {/* name */}
                                          <div>
                                            <label htmlFor="" className='block font-semibold capitalize'>Full Name</label>
                                            <input type="text" {...register('name',{required : 'Name is Required'})} 
                                             className='w-full px-3 py-2 mt-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'
                                             placeholder='Enter Your Name'
                                            />

                                            {errors.name && <p className='form_error'>{errors.name.message} </p>}
                                        </div>

                                     <div className='grid grid-cols-2 gap-x-2'>
                                             {/* email */}
                                          <div>
                                            <label htmlFor="" className='block font-semibold capitalize'>Email</label>
                                            <input type="email" {...register('email',{required : 'email is Required',
                                                 pattern : {
                                                    value : /^\S+@\S+$/i,
                                                    message :  "Invalid Eamil Address"
                                                 }
                                            })} 
                                             className='w-full px-3 py-2 mt-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'
                                             placeholder='Enter Email Adress'
                                            />

                                            {errors.email && <p className='form_error'>{errors.email.message} </p>}
                                        </div>

                                            {/* password */}
                                          <div className='relative'> 
                                            <label htmlFor="" className='block font-semibold capitalize'>Password</label>
                                            <input type={showPassword ? 'text' : 'password'} {...register('password',{required : 'password is Required',
                                            
                                            pattern : {
                                            value : /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                                            message : "Password Must Contain  1 Uppercase , 1 Lowercase, 1 number , 1 symbol and be at least 6 characters"

                                            }
                                        })} 
                                             className='w-full px-3 py-2 mt-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'
                                             placeholder='Enter Strong password '
                                            />

                                            {errors.password && <p className='form_error'>{errors.password.message} </p>}

                                                    <div className="password_toggle_icon absolute top-7/12 right-1/12" onClick={()=> setshowPassword(!showPassword)}>
                                                            {
                                                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                                            }
                                                    </div>
                                        </div>
                                     </div>


                                            {/* photo */}
                                          {/* <div>
                                            <label htmlFor="" className='block capitalize font-semibold'>Profile Picture</label>
                                            <input type="file" {...register('email',{required : 'phot is Required'})} 
                                             className='w-full px-3 py-2 mt-3 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400'
                                             placeholder='Upload Photo'
                                            />

                                            {errors.email && <p>{errors.email.message} </p>}
                                        </div> */}




                                        {/* submit button */}

                                        <button type='submit' className='primary_btn w-full my-3'>Sign Up</button>

                                         <p className='text-base capitalize text-end'>don't have an acount ? please <Link className='primary_text_color'>Log In</Link></p>
                            </form>

                      </div>
                </div>
        </div>
    );
};

export default SignUp;