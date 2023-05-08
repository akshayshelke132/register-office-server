const myspl=require('mysql');

const conn=myspl.createConnection({
    host:'localhost',
    user:"root",
    password:"net132@",
    database:"registerdb"
});
module.exports=conn;

conn.connect((err)=>{
    if(err){
        console.warn('error')
    }
    else{
        console.warn('connected')
    }
})