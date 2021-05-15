const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https=require('https');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', (req, res) => {
  res.sendfile(__dirname + "/signup.html")
})
app.post('/', (req, res) => {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.mail;
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      "merge_fields": {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };
  const jsonData=JSON.stringify(data)
  const url='https://us1.api.mailchimp.com/3.0/lists/2b3fd61198';
  const options={
    method:'POST',
    auth:"Mifrah:30d3da5b44f42f409b2f771afcad154f-us1"
  }
  const request= https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendfile(__dirname+"/success.html");
    }
    else{
      res.send(__dirname+"/failure.html")
    }
    response.on('data',function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();
})
app.post('/failure',(req,res)=>{
  res.send('/')
})
app.listen(process.env.PORT|| 3000, () => {
  console.log(`Example app listening`)
})
