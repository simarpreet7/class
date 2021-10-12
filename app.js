var app=require('express')();
const PORT=process.env.PORT||3000;
const bodyParser = require('body-parser');
const _=require('lodash')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
var mongoose=require('mongoose')
const url=process.env.URL||"mongodb://localhost/node-demo"
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
app.get('/name',(req,res)=>{
  User.find({},(err,docs)=>{
    if(err)
    return res.send(err)
    else if(_.isEmpty(docs))
    return  res.render("index",{data:null})
    else{
    return  res.render("index",{data:docs})
    }
  })

})
app.post('/delete/:id',(req,res)=>{
  if(req.params.id){
    User.remove({_id:req.params.id}).then((item)=>{
      return res.redirect("/name")
    }).catch((err)=>{
      return res.send(err)
    })
  }
  else{
    res.send("no id")
  }
})

app.post('/create',(req,res)=>{
  var data=new User(req.body)
  data.save().then(item=>{
    res.redirect("/name")
  }).catch(err=>{
    res.send(err)
  })
})

app.post('/update',(req,res)=>{
  let update={
    firstName:req.body.firstName,
    lastName:req.body.lastName
  }
  User.updateOne({_id:req.body.id},update).then(item=>{
    res.redirect("/name")
  }).catch(err=>{
    res.send(err);
  })
})

app.listen(PORT,()=>{
    console.log("app started on port : "+PORT)
})
