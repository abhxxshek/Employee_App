import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  
  function logoutToken(){
    sessionStorage.removeItem('logintoken'); 
  }

  const token=sessionStorage.getItem('logintoken');
  let role=null;
  if(token){
    try{
      const decodedToken=jwtDecode(token);
      role=decodedToken.role;
    }catch(error){
      console.log("Invalid token:",error);
    }
  }
  return (
    <div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:'black'}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
           
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EMPLOYEE APP
          </Typography>
          <Link to={'/home'}><Button color="inherit"style={{color:'white'}}>Home</Button></Link>
          {role=='admin' && ( 
          <Link to={'/add-emp'}><Button color="inherit"style={{color:'white'}}>Add Employee</Button></Link>)}
          <Link to={'/'}><Button color="inherit" style={{color:'white'}} onClick={logoutToken}>Log Out</Button></Link>
          
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Navbar