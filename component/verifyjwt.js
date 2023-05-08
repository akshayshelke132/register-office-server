const jwt=require('jsonwebtoken');

jwtverify=(req,resp,next)=>{
   const token = req.body.headers['auth'];
   if(!token){
    resp.send({sms:"Please provide tocken"})
   }
   if(typeof(req.body.username)==null || req.body.username.length<4){
    resp.send({sms:"username should be more than 3 char!"})
   }
   if(typeof(req.body.password)==null || req.body.password.length<4){
    resp.send({sms:"Password should be more than 3 char!"})
   }  
   else{
    jwt.verify(token,'keyjwt',(err,into)=>{
        if(err){
            resp.send({sms:"Invalid authorization!"}) 
        }else{
            next()
        }
    })
   }
};
module.exports=jwtverify; 