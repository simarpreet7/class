// npm install nodemon express
const express=require("express")
const app=express();
const PORT=3000

app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html")
})

app.get("/wow/:name",(req,res)=>{
    // res.sendfile("/views/${req.params.name}.html")
    res.render("wow",{data:req.params.name})
    // res.json(data)
})

app.get("/csr",(req,res)=>{
    res.json({data:"sam"})
})


app.listen(PORT,()=>{
    console.log("app started on port : "+PORT)
})
