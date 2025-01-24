import { Box, Button,TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid2';
import axios from 'axios';

const Signup = () => {
  const[form,setForm]=useState({
    name:'',
    email:'',
    password:'',
    role:'user'
  })

  const [errors,setErrors]=useState({});
  const navigate=useNavigate();
  
  function validate(){
    let valid=true;
    const errors={};

    //name validation
    if(form.name.trim()==""){
      errors.name='Name is required !';
      valid=false
    }

    //email validation
    const emailRegex = /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    if(form.email.trim()==""){
      errors.email='Email is required !'
    }else if(!emailRegex.test(form.email)) {
      errors.email='Invalid Email format'
      valid=false;
    }

    //password validation
      if(form.password.trim()==""){
        errors.password='Password is required !'
        valid=false;
      }

      setErrors(errors);
      return valid;
    }
  
  
  function capValue(){
  if(validate()){
    
    console.log(form);
    axios.post("http://localhost:8000/user/adduser",form).then((res)=>{
      alert(res.data.message);
      navigate('/home');
    }).catch((error)=>{
      alert(error.response.data.message);
    })
  }
}


  return (

    <div style={{display: "flex",
        flexDirection:'column',
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", 
        width: "100%", 
        padding: 2,}}>
       <Typography variant='h4' style={{color:"black"}}>SIGN UP</Typography><br /><br />
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 6}}>
          <TextField fullWidth label='Name' variant='outlined' name='name' error={!!errors.name} helperText={errors.name} onChange={(e)=>{
            setForm({...form,name:e.target.value})
          }}></TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth label='Email' variant='outlined' name='email' error={!!errors.email} helperText={errors.email} onChange={(e)=>{
          setForm({...form,email:e.target.value})
        }}></TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth label='Password' variant='outlined' name='password' error={!!errors.password} helperText={errors.password} onChange={(e)=>{
          setForm({...form,password:e.target.value})
        }}></TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth label='Role' variant='outlined' name='role' value='user'  slotProps={{
          input: {
            readOnly: true,
          }
        }}></TextField>
        </Grid>             
      </Grid>
      <Box sx={{ textAlign: "center", marginTop:"10px" }}>
        <Button  variant='contained' style={{backgroundColor:'black'}} onClick={capValue} >Sign Up</Button><br /><br />
    </Box>
    <Link to={'/'}style={{color:'black',textDecoration:'none'}}>Already a user? Login</Link>
    </div>
  )
}

export default Signup