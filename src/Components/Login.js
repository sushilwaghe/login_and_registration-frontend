import React, { useState } from 'react'
import './Login.css'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaUserAlt } from "react-icons/fa";
import { BiSolidLock, BiUserCircle } from "react-icons/bi";
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function Login({setIsAuthenticated}) {
  const history = useHistory()

  const [loginInfo,setLoginInfo] =useState({
    "email":"",
    "password":""
  })

  const checkLogin = (loginInfoData)=>{
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/signin', loginInfoData)
        .then(response => {
          const res ={
            "data":response.data,
            "status":response.status
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  const handleLogin =(loginInfoData)=>{
    checkLogin(loginInfoData).then((response)=>{

      if(response.status === 200){
        localStorage.setItem('token', response.data.token);
        setIsAuthenticated(true)
      }
      if(response.status === 201){
        alert(response.data.Error)
      }
    })
    .catch(err=>console.log("handleLogin ::",err))

  }

  return (
    <div className='container'>
      <form className='login-form'>
      <div>
      <div className='signin-btn'>
      <Button variant="SIGNIN" className='sign-btn'>SIGN IN</Button>{' '}
      </div>
      <div>
        <BiUserCircle className='login-logo'/>
      </div>
      <div className='input-field'>
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
        <FaUserAlt className='field-icons'/>
        <Form.Control
          className='inputs'
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e)=>setLoginInfo({...loginInfo,"email":e.target.value})}
          
        />
      </InputGroup>
      </div>
      <div className='input-field'>
      {/* <label>Password</label> */}
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
        <BiSolidLock className='field-icons'/>
        <Form.Control
          className='inputs'
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          type='password'
          onChange={(e)=>setLoginInfo({...loginInfo,"password":e.target.value})}

        />
      </InputGroup>
      </div>
      <div className='forgot-pass'>
      <div className='remember'>Remember Me</div>
      <div className='forgot'>Forgot Your Password?</div>
      </div>
      <div className='login-btn'>
      <Button onClick={()=>handleLogin(loginInfo)} variant="LOGIN" className='log-btn'>LOGIN</Button>
      </div>
      <div className='gotoLogin'><p className='paragraph'><span className='text-login' onClick={()=>{history.push('/register')}}>Register</span></p></div>
      </div>
      </form>
    </div>
  )
}

export default Login;
