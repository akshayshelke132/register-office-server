const express=require('express');
const conn=require("./component/config.js");
const Rfilter=require('./component/regfilter.js')
const Lfilter=require('./component/logfilter.js')
const cors=require('cors');
const jwt=require('jsonwebtoken');
const jwtverify=require('./component/verifyjwt.js')

const apk=express();
apk.use(express.json());
apk.use(cors());

apk.post('/regin',Rfilter,(req,resp)=>{
    
    const email=req.body.email;
    const usern=req.body.username;
    const password=req.body.password;

    conn.query('INSERT INTO userdata (email , username, passd) VALUES(?,?,?)',[email,usern,password],(err,result)=>{
        if(err){
            resp.send(err);
        }
        else{
            if(result){
                const nam=email;
                const token=jwt.sign({nam},'keyjwt',{expiresIn:800});
                resp.send({into: result,token})
            }
            else{
                resp.send({sms:'Please Fill All Field'})
            }
        }

    })
})


apk.post('/login',Lfilter,(req,resp)=>{
    const email=req.body.email;
    const password=req.body.password;

    conn.query('SELECT * FROM userdata where email=? and passd=?',[email,password],(err,result)=>{
        if(err){
            resp.send(err);
        }
        else{
            if(result.length>0){
                const nam=email;
                const token=jwt.sign({nam},'keyjwt',{expiresIn:800});
                resp.send({into: result,token})
            }
            else{
                resp.send({sms:'Invalid Credential!'})
            }
        }

    })
})

apk.post('/get_user_detail', jwtverify,(req,resp)=>{
    const uid=req.body.uid;
    
    conn.query('SELECT * FROM userdata where uid=?',[uid],(err,result)=>{
        if(err){
            resp.send(err);
        }
        else{
            if(result.length>0){
                resp.send(result)
            }
            else{
                resp.send({sms:'no any data!'})
            }
        }

    })
})

apk.put('/user_update',jwtverify,(req,resp)=>{
    
    const username=req.body.username;
    const password=req.body.password;
    const uid=req.body.uid
    
    conn.query('update userdata set username=?, passd=? where uid=?',
    [username,password,uid],(err,result)=>{
        if(err){
            resp.send(err);
        }
        else{
            if(result){
                resp.send(result)
            }
            else{
                resp.send({sms:'Please Fill All Field'})
            }
        }
 
    })
})


apk.listen(4006,()=>{
    console.log("runing server")
});
