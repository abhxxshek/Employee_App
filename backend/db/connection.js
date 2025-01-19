const mongoose=require('mongoose');
mongoose.connect(process.env.DB_url).then(()=>{
    console.log("DB connection successfull");
}).catch((error)=>{
    console.log("Db connection failed !");
})