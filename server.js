const express=require("express");
const hbs=require("hbs");
const fs=require("fs");

const PORT=process.env.PORT || 3000;

var app=express();

app.set("view engine","hbs");
hbs.registerPartials(__dirname+"/views/partials");
hbs.registerHelper("getCurrentYear",()=>new Date().getFullYear());
hbs.registerHelper("screamIt",text=>text.toUpperCase());



app.use((req,res,next)=>{
    var now= new Date().toString();
    var log=`${now}: ${req.method} ${req.path}`;

    fs.appendFile("server.log",log+"\n",(err)=>{
        if(err){
            console.log("Unable to log");
        }
    });
    next();
    

});

app.use((req,res,next)=>{
    
    if(req.path.includes("maintenance")){
        res.render("maintenance.hbs",{
            pageTitle:"Maintenance page"
        });
    }
    else{
        next();
    }
    

});

app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.send({msg:"Hello express "});
});

app.get("/about",(req,res)=>{
    //console.log("About rendering ");
    res.render("about.hbs",{
        pageTitle:"About page hbs",        
        welcomeMessage: "Welcome to our about"
    });
});

app.get("/home",(req,res)=>{
    //console.log("Home rendering ");
    res.render("home.hbs",{
        pageTitle:"Home page hbs",
        welcomeMessage: "Welcome to our site"
    });
});

app.listen(PORT,()=>{
    console.log(`Server is up on port ${PORT}`);
});