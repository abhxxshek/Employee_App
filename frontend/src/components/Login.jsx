
import {  Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const[form,setForm]=useState({
    email:'',
    pasword:'',
  })
  const navigate=useNavigate();

  function capValue(){
    console.log(form);
    axios.post('http://localhost:8000/user/login',form).then((res)=>{
      alert(res.data.message);
      if(res.data.token){
        sessionStorage.setItem('logintoken',res.data.token)
      }
      navigate('/home');
    }).catch((error)=>{
      alert(error.response.data.message);
    })
  }
  return (
    <div style={{display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'80vh'
    }}>
        <Typography variant='h4' style={{color:"black"}}>Employee App Login</Typography><br /><br />
        <div>
        <TextField label='Email' variant='outlined' name='email' onChange={(e)=>{
          setForm({...form,email:e.target.value})
        }} ></TextField><br /><br />
        </div>

        <div>
        <TextField label='Password' variant='outlined' name='password' onChange={(e)=>{
          setForm({...form,password:e.target.value})
        }}></TextField>
        </div>
        
        <br /><br />
        <Button  variant='contained' style={{marginBottom:'20px',backgroundColor:'black '}} onClick={capValue} >Login</Button> {/*capvalue is a function name we can change it according to the function name that we are defining in the above section  */}
        
        <Link to={'/signup'}style={{color:'black',textDecoration:'none'}}>New user? Sign up</Link>
        
    </div>
  )
  
}

export default Login