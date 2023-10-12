import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import './Table.css';
import {FiLogOut} from "react-icons/fi";
function Users({setIsAuthenticated}) {
  const [users,setUsers] =useState([]);

  const getUsers = ()=>{
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/users')
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
  useEffect(()=>{
    getUsers().then(response=>{

      if(response.status === 200){
        setUsers(response.data)
      } 
      if(response.status === 201){
        alert(response.data.error)
      } 
    }).catch(err=>console.log(err))
  },[])
  return (
  <>
    <div>
    <Button onClick={()=>{
      localStorage.removeItem('token')
      setIsAuthenticated(false)
      }} className='logout-btn'><span><FiLogOut /></span>LOGOUT</Button>

    </div>


    <Table striped bordered hover>
    <thead>
      <tr>
        <th>Sr.No</th>
        <th>Name</th>
        <th>Email</th>
        <th>DOB</th>

      </tr>
    </thead>
    <tbody>
      {users.map((userItem, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{userItem.name}</td>
          <td>{userItem.email}</td>
          <td>{new Date(userItem.dob).toISOString().split('T')[0]}</td>

        </tr>
      ))}
    </tbody>
  </Table>
  </>
  )
}

export default Users
