import {  Box, Button, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../axiosInterceptor';

const Add_employee = () => {
  const [form,setForm]=useState({
    name:'',
    designation:'',
    salary:'',
    department:'',
    location:''
  });
  const navigate=useNavigate();
  const location=useLocation();
  const[errors,setErrors]=useState({});

  function validate(){
    let valid=true;
    const errors={};

    //name validation code
    if(form.name.trim()==""){
      errors.name='Name is requied !'
      valid=false;
      
    }

    //designation validation
    if(form.designation.trim()==""){
      errors.designation='Designation is required !'
      valid=false;
    }

    //salary validation
    const salaryRegex = /^[0-9]+(\.[0-9]{1,2})?$/;
    if(String(form.salary).trim()===""){
      errors.salary='Salary is required !'
      valid=false;
    }else if(!salaryRegex.test(form.salary)){
        errors.salary="Salary must be a valid number"
        valid=false;
    }

    //department validation
    if(form.department.trim()==""){
      errors.department='Department is required !'
      valid=false;
    }

    //location validation
    if(form.location.trim()==""){
      errors.location='Location is required !'
      valid=false;
    }

    setErrors(errors);
    return valid
  }



  function capValue(){
    if(validate()){
      if (location.state!=null) {
       
        axiosInstance.put('https://employee-app-backend-4jmq.onrender.com/employee/update-emp/'+location.state.item._id,form).then((res)=>{
          alert("Employee updated successfully");
          navigate('/home')
        }).catch((error)=>{
          alert(error.response.data.message);
        })
        
      }else{
        
        axiosInstance.post('https://employee-app-backend-4jmq.onrender.com/employee/add-emp',form).then((res)=>{
          alert(res.data.message);
          navigate('/home');
        }).catch((error)=>{
          alert(error.response.data.message);
        })
      }
    }
  }

  useEffect(()=>{
    if(location.state!=null){
      setForm({...form,name:location.state.item.name,
        designation:location.state.item.designation,
        salary:location.state.item.salary,
        department:location.state.item.department,
        location:location.state.item.location
      })
    }else{
      setForm({...form,name:'',
        designation:'',
        salary:'',
        department:'',
        location:''
      })
    }
  },[])
  
  return (
    <div style={{display: "flex",
        flexDirection:'column',
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", 
        width: "100%", 
        padding: 2,}}>
        
       <Typography variant='h4' style={{color:"black"}}>{location.state!=null?'Update Employee':'Add Employee'}</Typography><br /><br />
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, md: 6}}>
          <TextField fullWidth label='Name' variant='outlined' name='name' value={form.name} error={!!errors.name} helperText={errors.name} onChange={(e)=>{
            setForm({...form,name:e.target.value})
          }}></TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth label='Designation' variant='outlined' name='designation' value={form.designation} error={!!errors.designation} helperText={errors.designation} onChange={(e)=>{
          setForm({...form,designation:e.target.value})
        }} ></TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth label='Salary' variant='outlined' name='salary' value={form.salary} error={!!errors.salary} helperText={errors.salary} onChange={(e)=>{
          setForm({...form,salary:e.target.value})
        }}></TextField>
        </Grid>
        <Grid size={{ xs: 6, md: 6 }}>
        <TextField fullWidth label='Department' variant='outlined' name='department' value={form.department} error={!!errors.department} helperText={errors.department} onChange={(e)=>{
          setForm({...form,department:e.target.value})
        }}></TextField>
        </Grid>
        <Grid size={{ xs: 12, md: 12}}>
        <TextField fullWidth label='Location' variant='outlined' multiline rows={4} name='location' value={form.location} error={!!errors.location} helperText={errors.location}  onChange={(e)=>{
          setForm({...form,location:e.target.value})
        }} ></TextField>
        </Grid>        
      </Grid>
      <Box sx={{ textAlign: "center", marginTop:"10px" }}>
        <Button  variant='contained' style={{backgroundColor:'black'}} onClick={capValue}>{location.state!=null?'Update Employee':'Add Employee'}</Button><br /><br />
        </Box>
    
    </div>
  )
}

export default Add_employee
