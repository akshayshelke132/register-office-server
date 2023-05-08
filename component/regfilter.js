Rfilter=(req,resp,next)=>{
    if(req.body.username.length==0){
        resp.send({sms:"Please enter user name!"})
    }
    if(req.body.username.length<4){
        resp.send({sms:"username should be more than 3 char!"})
    }
    if(req.body.email.length==0){
        resp.send({sms:"Please enter email!"})
    }
    if(req.body.email.length<8){
        resp.send({sms:"Please enter valid email!"})
    }
    if(req.body.password.length==0){
        resp.send({sms:"Please create your password!"})
    }
    if(req.body.password.length<4){
        resp.send({sms:"Password should be more than 3 char!"})
    }
    else{
        next()
    }
    
}
module.exports=Rfilter;