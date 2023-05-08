Lfilter=(req,resp,next)=>{
    if(req.body.email.length==0){
        resp.send({sms:"Please enter email!"})
    }
    if(req.body.password.length==0){
        resp.send({sms:"Please enter your password!"})
    }
    else{
        next()
    }
}   
module.exports=Lfilter