import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
//import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import {FaEye, FaEyeSlash} from 'react-icons/fa'
function Login  () {
  
const [email,setEmail]=useState()
const [password,setPassword]=useState()
const [showPassword, setShowPassword] = useState(false);
const navigate=useNavigate()
 
const handleSubmit=(e)=>{
  e.preventDefault()
  //hardcode credentials
  const defaultEmail = 'user@guest.com';
  const defaultPassword = 'guestUser';


    if(email === defaultEmail && password === defaultPassword){
      localStorage.setItem('token', 'loggedin');
      navigate('/home')
      
    }else{
      
      alert("Invalid credential. Read the LinkedIn description");
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }



  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='login-text text-black '>Login</h2>
        <form onSubmit={handleSubmit}>
           <div className="mb-3">
           <label htmlFor="email" className='text-black'>
                <strong>Email</strong>
            </label>
            <input type="email"
            placeholder='Enter Email'
            autoComplete='off'
            name="email" id='email'
            className='form-control rounded-none'
            onChange={(e)=>setEmail(e.target.value)} />
           </div>
           <div className="mb-3">
            <label htmlFor="password" className='text-black'>
              <strong>Password</strong>
            </label><div className="password" style={{position: 'relative', color:'gray', fontSize:'20px'}}>
            <input type={showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            name='password' id='password'
            className='form-control rounded-none'
            onChange={(e)=>setPassword(e.target.value)} 
            />
            <span className="toggle-password" onClick={togglePasswordVisibility} style={{position:'absolute', right:'10px', top:'45%', transform:'translateY(-50%)'}}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            </div>
           </div>
           </form>
           <button type='submit' onClick={handleSubmit} className='btn-clr w-100 rounded-none btn btn-success border'>Login</button>

        <p className='text-black'>Don't Have an Account</p>
        <Link to="/register" className='btn btn-default border w-100 bg-light rounded-none text-decoration-none'>Sign Up</Link>
      </div>
    </div>
  );
}

export default Login