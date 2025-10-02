import React, { useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { TiEye } from "react-icons/ti";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { serverURL } from "../App"; // your backend URL

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1: email
  const [email, setEmail] = useState("");

  // Step 2: OTP
  const [otp, setOtp] = useState("");

  // Step 3: new password
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error / success messages
  const [message, setMessage] = useState("");

  // Step 1: send OTP
  const handleSendOTP = async () => {
    try {
      // Replace with your API call
      await axios.post(`${serverURL}/api/auth/forgot-password`, { email });
      setMessage("OTP sent to your email.");
      setStep(2);
    } catch (error) {
      console.log(error);
      setMessage("Failed to send OTP.");
    }
  };

  // Step 2: verify OTP
  const handleVerifyOTP = async () => {
    try {
      // Replace with your API call
      await axios.post(`${serverURL}/api/auth/verify-otp`, { email, otp });
      setMessage("OTP verified. Enter your new password.");
      setStep(3);
    } catch (error) {
      console.log(error);
      setMessage("Invalid OTP. Try again.");
    }
  };

  // Step 3: reset password
  const handleResetPassword = async () => {
    try {
      // Replace with your API call
      await axios.post(`${serverURL}/api/auth/reset-password`, { email, otp, password });
      setMessage("Password reset successfully!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      console.log(error);
      setMessage("Failed to reset password.");
    }
  };

  return (
    <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
      <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
        <div className='flex items-center gap-4 mb-4'>
          <IoMdArrowRoundBack 
            size={30} 
            className='text-[#ff4d2d] cursor-pointer' 
            onClick={() => navigate(-1)} 
          />
          <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password</h1>
        </div>

        {message && <p className='text-center text-sm text-green-600 mb-4'>{message}</p>}

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <form onSubmit={(e) => { e.preventDefault(); handleSendOTP(); }}>
            <div className='mb-4'>
              <label htmlFor='email' className='block text-sm font-medium mb-1'>Email</label>
              <input
                type='email'
                id='email'
                className='border border-gray-300 rounded-md p-2 w-full'
                placeholder='sample@gmail.com'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button type='submit' className='w-full mt-4 bg-[#ff4d2d] text-white py-2 rounded-lg'>Send OTP</button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={(e) => { e.preventDefault(); handleVerifyOTP(); }}>
            <div className='mb-4'>
              <label htmlFor='otp' className='block text-sm font-medium mb-1'>Enter OTP</label>
              <input
                type='text'
                id='otp'
                className='border border-gray-300 rounded-md p-2 w-full'
                placeholder='Enter OTP'
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>
            <button type='submit' className='w-full mt-4 bg-[#ff4d2d] text-white py-2 rounded-lg'>Verify OTP</button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}>
            <div className='mb-4 relative'>
              <label htmlFor='password' className='block text-sm font-medium mb-1'>New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='border border-gray-300 rounded-md p-2 w-full'
                placeholder='••••••••'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button 
                type='button'
                className="absolute right-3 top-[14px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <TiEye /> : <FaEyeSlash />}
              </button>
            </div>
            <button type='submit' className='w-full mt-4 bg-[#ff4d2d] text-white py-2 rounded-lg'>Reset Password</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
