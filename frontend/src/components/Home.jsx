import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor'
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const[cardData,setData]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
     axiosInstance.get('http://localhost:8000/employee').then((res)=>{
       setData(res.data);
     }).catch((error)=>{
       console.log(error)
     }
   ),[cardData]})

   function update_emp(item){
    navigate('/add-emp',{state:{item}});
   }
   
   function delete_emp(item){
    axiosInstance.delete(`http://localhost:8000/employee/delete-emp/${item._id}`).then((res)=>{
      alert(res.data.message);

    }).catch((error)=>{
      alert(error.response.data.message);
    })
   }

   const token=sessionStorage.getItem('logintoken');
   let role=null;

   if(token){
    try{
      const decodedToken=jwtDecode(token);
      role=decodedToken.role;
    }catch(error){
      console.log("Invalid token",error);
    }
    
   }


  return (
    <>
          <Box
      sx={{
        width: '100%',
        display: 'grid',
        padding:'5%',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(250px,100%), 1fr))',
        gap: 2,
        overflow: 'hidden',
        boxSizing:'border-box'

      }}
    >
      {cardData.map((item) => (
        
        <Card>
            <CardContent sx={{ height: '100%' ,width:'100%'}}>
              <Typography variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Designation: {item.designation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Salary: {item.salary}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Department: {item.department}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Location: {item.location}
              </Typography>
              
                {role=="admin" &&(
                  <CardActions >
                      <Button variant="outlined" style={{color:'black',border:'1px solid black',marginTop:'15px'}}  onClick={()=>{update_emp(item)}}>UPDATE</Button>
                      <Button variant="contained" style={{ backgroundColor: 'black', color: 'white',marginTop:'15px' }} onClick={()=>{delete_emp(item)}}> DELETE</Button>
                  </CardActions>
                )}
              
              
            
            </CardContent>
           
        </Card>
      ))}
    </Box>
    </>
  )
}

export default Home