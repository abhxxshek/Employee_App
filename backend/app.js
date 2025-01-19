const express=require('express')
const app=new express();
const morgan=require('morgan');
app.use(morgan('dev'));
require('dotenv').config();
require('./db/connection');
const cors=require('cors');
app.use(cors());



const userroutes=require('./routes/userRoutes');
app.use('/user',userroutes);

const emproutes=require('./routes/empRoutes');
app.use('/employee',emproutes);




app.listen(process.env.port,(req,res)=>{
    console.log(`Server listening on the port ${process.env.port}`)
})