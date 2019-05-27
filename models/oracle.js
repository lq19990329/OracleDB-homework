var oracledb = require('oracledb');
var config = {
  user:'PANG',
  password:'vnodbc528',
  connectString : "192.168.0.107:1521/test122"
};
exports.query=function (sql,callback){
    oracledb.getConnection(config,function(err, connection){
        if (err) {
          console.error(err.message);
          return;
        }
        connection.execute(sql,
          function(err, result)
          {
            if (err) {
              console.error(err.message);
              doRelease(connection);
              return;
            }
            //打印返回的表结构
            callback||callback(err,result)
              
          });
      });
}

  
  
  
