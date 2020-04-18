const express=require('express');
const exhbs=require('express-handlebars');
const mongoose=require('mongoose');
const mongodb = require('mongodb');
const app=express();

app.use('/public', express.static('public'));


// connect to mongodb
var dbData=[];
var uri="mongodb://dotsUser:dotsUser07@ds215388.mlab.com:15388/dots";

mongoose.Promise=global.Promise;
if(process.env.NODE_ENV === 'production'){
  mongoose.connect(uri)
  .then(()=> console.log('Mongo DB connected...'))
  .catch(err => console.log(err));
}else{
  mongoose.connect(uri)
  .then(()=> console.log('Mongo DB connected...'))
  .catch(err => console.log(err));
}

// load the model
require("./models/DotsGH");
var dotsModel=mongoose.model("DotsGH");


// middleware: express-handlebars
app.engine('handlebars', exhbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

function GetData(){
  var dbdata=[];
  mongodb.MongoClient.connect(uri, function(err, client){
    if(err) throw err;
    dbData=[];
    let db= client.db("dots");
    let collx=db.collection("DotsGH");
    let entry=collx.find({});
    entry.forEach(en=>{
      let data={"id": en._id, "user": en.UserName, "model": en.ModelName, "poly": en.PolyArrInStr};
      dbData.push(data);
    });
  });
  return dbData;
}

// index route
app.get('/',(req, res)=>{
  var dbData=GetData();  
  // console.log(dbData);
  // var jsonData=JSON.stringify(dbdata);
  // console.log(dbData);
  console.log(dbData.length);
  res.render('index', {
    encodedJson : encodeURIComponent(JSON.stringify(dbData))
  });

});


const port=5000;
app.listen(port, ()=>{
    console.log('server listening on port: '+ port);
});


