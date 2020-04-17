const express=require('express');
const exhbs=require('express-handlebars');
const mongoose=require('mongoose');
const mongodb = require('mongodb');
const app=express();

// connect to mongodb


  var dbData=[];
  var uri="mongodb://dotsUser:dotsUser07@ds215388.mlab.com:15388/dots";
  mongodb.MongoClient.connect(uri, function(err, client){
    if(err) throw err;
    let db= client.db('dots');
    let collx=db.collection('DotsGH');
    let entry=collx.find({});
    entry.forEach(en=>{
      console.log(en);
      dbData.push(en);
    });
  });

  
  DotsGH 



// middleware: express-handlebars
app.engine('handlebars', exhbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// index route
app.get('/',(req, res)=>{
  //var dbData = getDataFromDB();
  console.log("\n\n\n-----------------\n\n\n");
  var jsonData=JSON.stringify(dbData);
  console.log(jsonData);
  res.render('index', {data: encodeURIComponent(jsonData)});
});


const port=5000;
app.listen(port, ()=>{
    console.log('server listening on port: '+ port);
});


