import React, { useState } from 'react'
import './Register.css'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FaUserAlt } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { MdDateRange, MdEmail } from "react-icons/md"
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Register() {
  const history = useHistory()

  const [userInfo,setUserInfo]=useState({
    "name":"",
    "dob":"",
    "email":"",
    "password":""
  } )


  const sendRegistration = (userInfoData)=>{
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/register', userInfoData)
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

  const handleRegister =  (userInfoData)=>{
    sendRegistration(userInfoData).then((response)=>{

      if(response.status === 200){
        history.push('/login')
        setUserInfo({
          "name":"",
          "dob":"",
          "email":"",
          "password":""
        })
      }
      if(response.status === 201){
        alert(response.data.message)
      }
      if(response.status === 301){
        alert(response.data.message)
      }
    })
    .catch(err=>console.log("handleRegister ::",err))
    .finally(()=>{
      setUserInfo({
        "name":"",
        "dob":"",
        "email":"",
        "password":""
      })
    })

  }


  return (
    <div className='container'>
      <form className='reg-form'>
      <div>
      <div className='form-title'>
        <h2 className='title-text'>Registration</h2>
      </div>
      <div className='underline'></div>
      <div className='input-field'>
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
        <FaUserAlt className='field-icons'/>
        <Form.Control
          className='inputs'
          placeholder="Name"
          aria-label="Name"
          aria-describedby="basic-addon1"
          type='text'
          value={userInfo?.name || ''}
          onChange={(e)=>setUserInfo({...userInfo,"name":e.target.value})}
          
        />
      </InputGroup>
      </div>
      <div className='input-field'>
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
        <MdDateRange className='field-icons'/>
        <Form.Control
          className='inputs'
          placeholder="Date Of Birth"
          aria-label="Date Of Birth"
          aria-describedby="basic-addon1"
          type='date'
          value={userInfo?.dob || ""}

          onChange={(e)=>setUserInfo({...userInfo,"dob":e.target.value})}

          
        />
      </InputGroup>
      </div>
      <div className='input-field'>
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
        <MdEmail className='field-icons'/>
        <Form.Control
          className='inputs'
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon1"
          type='email'
          value={userInfo?.email || ''}
          onChange={(e)=>setUserInfo({...userInfo,"email":e.target.value})}
          
        />
      </InputGroup>
      </div>
      <div className='input-field'>
      <InputGroup className="mb-3">
        {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
        <BiSolidLock className='field-icons'/>
        <Form.Control
          className='inputs'
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon1"
          type='password'
          value={userInfo?.password || ''}
          onChange={(e)=>setUserInfo({...userInfo,"password":e.target.value})}
          
        />
      </InputGroup>
      </div>
      <div className='registration-btn'>
      <Button onClick={()=>handleRegister(userInfo)} variant="SUBMIT" className='reg-btn'>SUBMIT</Button>
      </div>
      <div className='gotoLogin'><p className='paragraph'>Already Register?<span className='text-login' onClick={()=>{history.push('/login')}}>Login</span></p></div>
      </div>
      </form>
    </div>
  )
}

export default Register
