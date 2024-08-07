var express =require('express');
var http =require('http');
var path=require('path');
var nodemailer =require('nodemailer');
var app=express();
const serverless = require("serverless-http");
const router = express.Router();
var server=http.Server(app);
var  port =process.env.PORT||4000

app.set("port",port);
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));

// Routing 
app.get("/",function(req,response){
    response.sendFile(path.join(__dirname,"public/index.html"))
})

app.post("/send_mail", function(req,response){
    var name=req.body.name;
    var from=req.body.from;
    var subject=req.body.subject;
    var message=req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'evangelistjavangwe55@gmail.com',
          pass: 'fpwb zzcj rfdv isce'
        }
      });
      
      var mailOptions = {
        name:name,
        from:from,
        to:"evangelistjavangwe55@gmail.com",
        subject:subject,
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        response.redirect("/")
      });

}
)

//initialize web server

server.listen(port,function(){
    console.log("Sarting on port :"+port)
})


//Netlify data
app.use("/.netlify/functions/app", router);
module.exports.handler = serverless(app);