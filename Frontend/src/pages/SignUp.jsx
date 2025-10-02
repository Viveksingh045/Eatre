import { useState } from 'react';
import { TiEye } from "react-icons/ti";
import { FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { serverURL } from "../App"; 


function SignUp() {
  const primaryColor = "#ff4d2d"; // Example primary color
  const hoverColor = "#e64323"; // Example hover color
  const bgColor = "#fff9f6"; // Example background color
  const borderColor = "#ddd"; // Example border color
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
 

  const handleSignUp=async()=>{
    try {
      const result=await axios.post(`${serverURL}/api/auth/signup`,{
        fullName,email,mobile,password,role
      },{ withCredentials:true
      })
    console.log(result);

    }catch (error) {
      console.log("Error during sign up:", error);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center p-4' style={{ backgroundColor: bgColor }}>
      <div className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 border-[1px]`} style={{ border: `1px solid ${borderColor}` }}>
        <h1 className={`text-3xl font-bold mb-2`} style={{ color: primaryColor }}>Eatre</h1>
        <p className='text-gray-600 mb-8'> Create an account to get started with Eatre.</p>


        {/* fullName */}
        <div className='mb-4'>
          <label htmlFor='fullName' className='block text-sm font-medium mb-1'>Full Name</label>
          <input type='text' id='fullName' className='border border-gray-300 rounded-md p-2 w-full' placeholder='John Doe' style={{ border: `1px solid ${borderColor}` }}  onChange={(e) => setFullName(e.target.value)} value={fullName} />
        </div>
        {/* email */}
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium mb-1'>Email</label>
          <input type='email' id='email' className='border border-gray-300 rounded-md p-2 w-full' placeholder='sample@gmail.com' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        {/* Mobile */}
        <div className='mb-4'>
          <label htmlFor='mobile' className='block text-sm font-medium mb-1'>Mobile</label>
          <input type='text' id='mobile' className='border border-gray-300 rounded-md p-2 w-full' placeholder='+91 ' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setMobile(e.target.value)} value={mobile} />
        </div>
        {/* password */}
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium mb-1'>Password</label>
          <div className='relative'><input type={showPassword ? 'text' : 'password'} id='password' className='border border-gray-300 rounded-md p-2 w-full' placeholder='••••••••' style={{ border: `1px solid ${borderColor}` }} onChange={(e) => setPassword(e.target.value)} value={password} />
          <button  className= "absolute right-3 top-[14px] cursor-pointer text-gray-500" onClick={() => setShowPassword(!showPassword)}>{!showPassword? <TiEye /> : <FaEyeSlash />} </button></div>
        </div>
        {/* role */}
        <div className='mb-4'>
          <label htmlFor='role' className='block text-sm font-medium mb-1'>Role</label>
          <div className='flex gap-2'>
            {["user", "owner", "delivery boy"].map((r) => (
              <button className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer' 
              onClick={() => setRole(r)} 
              style={
                role==r? {backgroundColor: primaryColor, color: 'white', border: `1px solid ${primaryColor}`}
                : {border: `1px solid ${primaryColor}`, color: "#333"}
              }>{r}</button>
            ))}
          </div>
        </div>



        <button className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSignUp}>Sign UP</button>
        
        <button className='w-full mt-4 flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition-colors cursor-pointer' style={{ border: `1px solid ${borderColor}` }}>
          <FcGoogle size={20} /><span>Sign up with Google</span>
        </button>
        <p className='text-center mt-2'>Already have an account? <a href="/signin" className='text-[#ff4d2d] font-semibold'>Sign in</a></p>
      </div>
      
    </div>
  );
}

export default SignUp;
