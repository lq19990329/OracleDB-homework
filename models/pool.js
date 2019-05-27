var mysql=require('mysql');
var database=require('./database');
database.config.connectionLimit=10;
module.exports=mysql.createPool(database.config);