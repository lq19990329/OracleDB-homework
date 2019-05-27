const express = require('express')
const app = express()
const apiRouter=require('./controllers/api')
var oracledb = require('oracledb');
oracledb.autoCommit=true;
const session=require('express-session')
const path=require('path')
function doRelease(connection)
  {
    connection.close(
      function(err) {
        if (err) {
          console.error(err.message);
        }
      });
  }
app.use(express.static(path.join(__dirname, 'www')))
app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUnintialized:true
}))
app.use('/', express.static('www'))
app.get('/api/login',(req,res)=>{
  console.log(req.query)
  oracledb.getConnection(config,function(err, connection){
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(`SELECT * from 员工 where 人员姓名='${req.query.username}' and 联系方式='${req.query.password}'`,
      function(err, result)
      {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows.length)
        
        if(result.rows.length!=0){
            req.session.isLogin=1;
            req.session.user=result.rows[0][1];
            req.session.job=result.rows[0][3];
            res.json({
              errCode:1,
            })
        }else{
          res.json({
            errCode:0
          })
        }
         
      });
  });
  


 
 
}) 
app.get('*',(req,res,next)=>{
  if(req.url !='/login' && !req.session.isLogin){
    res.redirect('/login')
  }
  else{
    next()
  }
}) 
app.use('/',apiRouter)



var config = {
  user:'PANG',
  password:'vnodbc528',
  connectString : "localhost:1521/test122"
};

app.use('/getEmp',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute("SELECT * from 员工",
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            let arr=[]
            for(let i=0;i < result.rows.length;i++){
              let arr1={};
              arr1.id=result.rows[i][0];
              arr1.name=result.rows[i][1];
              arr1.tel=result.rows[i][2];
              arr1.job=result.rows[i][3];
              arr.push(arr1)
          }
            //打印返回的表结构
            res.json(arr)    
          });
      });
})
app.use('/delEmp',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(`DELETE FROM 员工 WHERE 人员编号 = '${req.query.id} '`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            console.log(req.query.id,'删除')
             
          });
          res.json({
            message:'chenggong'
          })
      });
})
app.use('/insEmp',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`INSERT INTO 员工 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}')`)
        connection.execute(`INSERT INTO 员工 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}')`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('插入成功')
          });
          res.json({
            message:'成功'
          })
      });
})
app.use('/updEmp',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
       
        connection.execute(`update  员工 set 人员姓名='${req.query.name}',联系方式='${req.query.tel}',职位='${req.query.job}' where 人员编号='${req.query.id}'`,
          function(err, result)  
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('修改成功')
          });
          res.json({
            message:'修改成功'
          })
      });
})
app.use('/getStore',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute("SELECT * from 分店",
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            let arr=[]
            for(let i=0;i < result.rows.length;i++){
              let arr1={};
              arr1.id=result.rows[i][0];
              arr1.name=result.rows[i][1];
              arr1.address=result.rows[i][2];
              arr1.empId=result.rows[i][3];
              arr.push(arr1)
          }
            //打印返回的表结构
            res.json(arr)    
          });
      });
})
app.use('/delStore',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(`DELETE FROM 分店 WHERE 分店编号 = '${req.query.id} '`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            console.log('shanchu')
             
          });
          res.json({
            message:'chenggong'
          })
      });
})
app.use('/insStore',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`INSERT INTO 分店 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}')`)
        connection.execute(`INSERT INTO 分店 VALUES ('${req.query.id}','${req.query.name}','${req.query.address}','${req.query.job}')`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('插入成功')
          });
          res.json({
            message:'成功'
          })
      });
})
app.use('/updEmp',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
       
        connection.execute(`update  分店 set 分店名称='${req.query.name}',分店地址='${req.query.tel}',店长编号='${req.query.job}' where 分店编号='${req.query.id}'`,
          function(err, result)  
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('修改成功')
          });
          res.json({
            message:'修改成功'
          })
      });
})
app.use('/getMem',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute("SELECT * from 会员",
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            let arr=[]
            for(let i=0;i < result.rows.length;i++){
              let arr1={};
              arr1.id=result.rows[i][0];
              arr1.name=result.rows[i][1];
              arr1.tel=result.rows[i][2];
              arr1.score=result.rows[i][3];
              arr.push(arr1)
          }
            //打印返回的表结构
            res.json(arr)    
          });
      });
})
app.use('/delMem',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(`DELETE FROM 会员 WHERE 会员编号 = '${req.query.id} '`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            console.log('shanchu')
             
          });
          res.json({
            message:'chenggong'
          })
      });
})
app.use('/insMem',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`INSERT INTO 会员 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}')`)
        connection.execute(`INSERT INTO 会员 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}')`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('插入成功')
          });
          res.json({
            message:'成功'
          })
      });
})
app.use('/updMem',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
       
        connection.execute(`update  会员 set 会员姓名='${req.query.name}',联系方式='${req.query.tel}',积分='${req.query.job}' where 会员编号='${req.query.id}'`,
          function(err, result)  
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('修改成功')
          });
          res.json({
            message:'修改成功'
          })
      });
})
app.use('/getList',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute("SELECT * from 订单",
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            let arr=[]
            for(let i=0;i < result.rows.length;i++){
              let arr1={};
              arr1.id=result.rows[i][0];
              arr1.date=result.rows[i][1];
              arr1.empID=result.rows[i][2];
              arr1.info=result.rows[i][3]; 
              arr1.storeID=result.rows[i][4]; 
              arr1.memID=result.rows[i][5]; 
              arr1.money=result.rows[i][6]; 
              arr.push(arr1)
          }
            //打印返回的表结构
            res.json(arr)    
          });
      });
})
app.use('/delList',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(`DELETE FROM 订单 WHERE 订单编号 = '${req.query.id} '`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            console.log('shanchu')
             
          });
          res.json({
            message:'chenggong'
          })
      });
})
app.use('/insList',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`INSERT INTO 订单 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}')`)
        connection.execute(`INSERT INTO 订单 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}','${req.query.el5}','${req.query.el6}','${req.query.el7}')`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('插入成功')
          });
          res.json({
            message:'成功'
          })
      });
})
app.use('/updMem',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
       
        connection.execute(`update  订单 set 日期 ='${req.query.name}',售药人员编号='${req.query.tel}',售药信息='${req.query.job}',分店编号='${req.query.el5}',会员编号='${req.query.el6}',交易额='${req.query.el7}' where 订单编号='${req.query.id}'`,
          function(err, result)  
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('修改成功')
          });
          res.json({
            message:'修改成功'
          })
      });
})
app.use('/getMed',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute("SELECT * from 药品",
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            let arr=[]
            for(let i=0;i < result.rows.length;i++){
              let arr1={};
              arr1.id=result.rows[i][0];
              arr1.name=result.rows[i][1];
              arr1.date=result.rows[i][2];
              arr1.lDate=result.rows[i][3];
              arr1.number=result.rows[i][4];
              arr1.price=result.rows[i][5];
              arr1.bid=result.rows[i][6];
              arr.push(arr1)
          }
            //打印返回的表结构
            res.json(arr)    
          });
      });
})
app.use('/delMed',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(`DELETE FROM 药品 WHERE 订单编号 = '${req.query.id} '`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            console.log('shanchu')
             
          });
          res.json({
            message:'chenggong'
          })
      });
})
app.use('/insMed',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        console.log(`INSERT INTO 药品 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}')`)
        connection.execute(`INSERT INTO 药品 VALUES ('${req.query.id}','${req.query.name}','${req.query.tel}','${req.query.job}','${req.query.el5}','${req.query.el6}','${req.query.el7}')`,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('插入成功')
          });
          res.json({
            message:'成功'
          })
      });
})
app.use('/updMem',(req,res)=>{
  oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
       
        connection.execute(`update  药品 set 药品名称 ='${req.query.name}',生产日期='${req.query.tel}',保质期='${req.query.job}',数量='${req.query.el5}',售价='${req.query.el6}',进价='${req.query.el7}' where 药品编号='${req.query.id}'`,
          function(err, result)  
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            
             console.log('修改成功')
          });
          res.json({
            message:'修改成功'
          })
      });
})
app.listen(3000, () => console.log('Example app listening on port 3000!'))