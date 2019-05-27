const express = require ('express')
const router = express.Router()
const db =require('../models/db')
const oracledb=require('oracledb')
const path=require('path')



module.exports=router
var config = {
  user:'PANG',
  password:'vnodbc528',
  connectString : "192.168.0.107:1521/test122"
};

    

  
  function doRelease(connection)
  {
    connection.close(
      function(err) {
        if (err) {
          console.error(err.message);
        }
      });
  }
  

router.get('/api/user',(req,res)=>{
  res.json({
    user:req.session.user,
    job:req.session.job
  })
}) 
router.get('/api/logout',(req,res)=>{
  req.session.destroy();
  res.json({
    message:'success'
  })
}) 
router.get('/login',(req,res)=>{
  //判断用户名密码
  
  res.sendFile(path.join(__dirname,'../views/login.html'))
}) 
router.get('/emp',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/emp.html'))
})
router.get('/store',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/store.html'))
})
router.get('/index',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/index.html'))
})
router.get('/member',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/member.html'))
})
router.get('/list',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/list.html'))
})
router.get('/medicine',(req,res)=>{
  res.sendFile(path.join(__dirname,'../views/medicine.html'))
})



router.get('/b',(req,res)=>{
    db.query('select * from cust',function(err,rows){
      res.json(rows)
    })
      
})
router.get('/c',(req,res)=>{
  console.log(req.query)
  res.jsonp({
    errCode:1
  })
})
// router.get('/a',(req,res)=>{
//   oracledb.getConnection(config,function(err, connection){
//     console.log(5)
//         if (err) {
//           console.error(err.message);
//           return;
//         }
//         console.log(1);
//         connection.execute("SELECT * from 员工",
//           function(err, result)
//           {
//             if (err) {
//               console.error(err.message);
//               doRelease(connection);
//               return;
//             }
//             //打印返回的表结构
//             res.json(result)    
//           });
//       });
// })

    
