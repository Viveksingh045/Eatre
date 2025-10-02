import React from 'react';
import { useState } from 'react';
import { TiEye } from "react-icons/ti";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { serverURL } from "../App"; 


function SignIn() {
  const primaryColor = "#ff4d2d"; // Example primary color
  const hoverColor = "#e64323"; // Example hover color
  const bgColor = "#fff9f6"; // Example background color
  const borderColor = "#ddd"; // Example border color
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSignIn=async()=>{
    try {
      const result=await axios.post(`${serverURL}/api/auth/signin`,{
        email,password
      },{ withCredentials:true
      })
    console.log(result);

    }catch (error) {
      console.log("Error during sign in:", error);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ border: `1px solid ${borderColor}` }}>
        <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>Eatre</h1>
        <p className='text-gray-600 mb-8'> Sign in to your account</p>


        {/* email */}
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>Email</label>
          <input type='email' id='email' className='border border-gray-300 rounded-md p-2 w-full' placeholder='sample@gmail.com' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
      
        {/* password */}
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium mb-1'>Password</label>
          <div className='relative'><input type={showPassword ? 'text' : 'password'} id='password' className='border border-gray-300 rounded-md p-2 w-full' placeholder='••••••••' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} />
          <button  className= "absolute right-3 top-[14px] cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>{!showPassword? <TiEye /> : <FaEyeSlash />} </button></div>
        </div>
        <div className='text-right mb-4 text-[#ff4d2d] font-medium cursor-pointer' onClick={()=>navigate("/forgot-password")}>
          Forgot Password ?
        </div>


        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignIn}>Sign IN</button>
        
        <button className='w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition-colors cursor-pointer' style={{ border: `1px solid ${borderColor}` }}>
          <FcGoogle size={20} /><span>Sign in with Google</span>
        </button>
        <p className='text-center mt-2'>Want to Create  new account ? <a href="/signup" className='text-[#ff4d2d] font-semibold'>Sign up</a></p>
      </div>
      
    </div>
  );
}

export default SignIn;
