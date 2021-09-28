var app=require('express')();
const PORT=3000;
const bodyParser = require('body-parser');
const _=require('lodash')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var mongoose=require('mongoose')
const url="mongodb://localhost/node-demo"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(url, connectionParams)
    .then(() => {
      console.log("connected to database")
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

var nameSchema= new mongoose.Schema({
  firstName:String,
  lastName:String,
})   
var User=mongoose.model("User",nameSchema)
app.set("view engine","ejs")
app.get('/name/:id',(req,res)=>{
  User.find({},(err,docs)=>{
    if(err)
    return res.send(err)
    else if(_.isEmpty(docs))
    return  res.render("index",{data:null})
    else{
    return  res.render("index",{data:docs,user:req.params.id})
    }
  })

})

app.listen(PORT,()=>{
    console.log("app started on port : "+PORT)
})
