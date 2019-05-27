var pool=require('./pool');
exports.query=function(sql,arr,callback){
    pool.getConnection(function(err,connection){
        if(err) 
        throw err;
        connection.query(sql,arr,function(error,results,fields){
            connection.release();
            if(error) throw error;
            callback&&callback(results,fields)
        })
    })
}