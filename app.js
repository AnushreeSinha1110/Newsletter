//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));//thid hepls in using static files that are css and images
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }]
  };
  const jsonData=JSON.stringify(data);

  const url="https://us1.api.mailchimp.com/3.0/lists/54710eeb8e";
  const options={
    method:"post",
    auth:"Anushree:34e3d28e3257722294f935e7e8f66e21-us1"
  };

const request=https.request(url,options,function(response){

  if(response.statusCode==200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }


    response.on("data",function(data)
  {
    console.log(JSON.parse(data));
  });
});
request.write(jsonData);
request.end();
});


app.post("/failure",function(req,res){
  res.redirect("/");
});

let port = process.env.PORT;
if(port==null||port==""){
  port=3000;
}
app.listen(port, function(){
  console.log("server has started");
});

//API Key
//34e3d28e3257722294f935e7e8f66e21-us1

//List ID
//54710eeb8e
