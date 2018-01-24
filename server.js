const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port = process.env.PORT || 8000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(error)=>{
    console.log(error);
  });
  next();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    welcomeMessage: 'Welcome',
    pageTitle: 'Welcome to my website'
  });
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/projects',(req,res)=>{
  res.render('projects.hbs',{
    welcomeMessage: 'Welcome To Projects Page',
    pageTitle: 'Projects'
  });
});
app.listen(port,()=>{
  console.log(`Server up and running on port ${port}`);
});
