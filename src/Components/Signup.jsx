import React from 'react';
import './Login.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Signup = () => {

const [name, setName]=useState()
const [email,setEmail]=useState()
const [password,setPassword]=useState()
const navigate=useNavigate()
const [showPassword, setShowPassword] = useState(false);

const togglePasswordVisibility = ()=>{
  setShowPassword(!showPassword);
}
const handleSubmit =(e)=>{
  e.preventDefault()
  axios.post('http://localhost:3001/register',{name,email,password})
  .then(result=>{console.log(result)
    navigate('/login') 
  })
  .catch(err=>console.log(err))
}

  return (
    <div className='vh-100 justify-content-center align-items-center bg-secondary flex'>
       <div className='bg-white p-3 rounded w-25'>
        <h2 className='register text-black'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className='text-black'>
                <strong>Name</strong>
            </label>
            <input 
            type="text"
            placeholder='Enter Name'
            autoComplete='off'
            name='email' id='name'
            className='form-control rounded-none' 
            onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className='text-black'>
                <strong>Email</strong>
            </label>
            <input type="email"
            placeholder='Enter Email'
            autoComplete='off' id='email'
            className='form-control rounded-none' 
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className='text-black'>
                <strong>Password</strong>
            </label>
            <div className="password" style={{position:'relative', color:'gray', fontSize:'20px'}}>
            <input type={showPassword ? 'text' : 'password'} id='password'
            placeholder='Enter Password'
            className='form-control rounded-none'
            onChange={(e)=>setPassword(e.target.value)}/>
             <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            cursor: 'pointer'
          }}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
            </div>
          </div>
          <button type='submit' className='btn-clr w-100 rounded-none btn btn-success border'>
           Register
          </button>
          </form>
          <p className='text-black'>Already Have an Account?</p>
          <Link to="/login" className='btn btn-default border w-100 bg-light rounded-none text-pretty hover-buton'>
            Login
          </Link> 
       
       </div>
    </div>
  )
}

export default Signup