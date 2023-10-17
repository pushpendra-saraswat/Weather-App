const express = require("express");
const https =require("https");
const bodyparse=require("body-parser");
const app = express();
app.use(bodyparse.urlencoded({extended:true}))


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
   
    
})
app.post("/",function(req,res){
   



    const query=req.body.cityname;
     const apikey="82013b56c0953f852caf5f2f793906bf";
     const URL="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
     https.get(URL,function(response){
         console.log(response.statusCode);
         response.on("data",function(data){
            const newdata= JSON.parse(data);
             console.log(newdata);
             const temp =newdata.main.temp;
             const temp1 =newdata.weather[0].description;
            const icon=newdata.weather[0].icon;
            const imageurl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp);
           
            
            res.write("<h1>The temp in "+query+" is "+ temp+ "</h1>");
            res.write("<p>the description is "+temp1 +"<p>");
            res.write("<img src="+imageurl+">");
            


        }) 
    });
     
})


/*
 

*/



app.listen(3000,function(){
    console.log("listening to port 3000");
} );
