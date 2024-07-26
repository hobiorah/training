const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const {logEvents,logger} = require('./middleware/logEvents');
const cors = require('cors');

// initialize object 
const myEmitter = new Emitter();


const PORT = process.env.PORT || 4500;

//custom middleware = something that every route will execute or have the properties for
app.use(logger);

//Cross Origin Resource Sharing
//whitelist specifiefies what ips/ websites can communicate with your server
const whitelist = ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) { //indexOf returns index of the value in parameter. if the value doesnt exist you'll get -1
            //first param in callback is error but theres no error so we send null
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

//app.use to apply middleware to all routes. 
//this particular use is for getting data out: urlencoded data = form data: content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({extended: false})) //use to handle form data

//getting data from requests that send json
app.use(express.json());

//lets you serve static filess like css. express will search for public directory for the request before getting to the other routes
//example: when html file uses a stylesheet link express will look in public folder for the file
app.use(express.static(path.join(__dirname, '/public')));


//first route
app.get('/', (req,res) => {
   // res.send('Hellow World!');
   //res.sendFile('./views/index.html', { root: __dirname}); //one way: tell express what directory to look for to start going into views/
   res.sendFile(path.join(__dirname, 'views', 'index.html')); //
});

app.get('/new-page(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html')); //
 });

 app.get('/old-page(.html)?', (req,res) => {
    res.redirect(301,'/new-page.html'); //302 response code by default but ideally is 301
 });

 

 // Route handlers - you can chain multiple handlers (functions you want to call when theres a route match)
 app.get('/hello(.html)?', (req,res,next) => {
   // res.sendFile(path.join(__dirname, views, 'new-page.html')); //
   console.log ('attempted to laod hello.html');
   next() //calls the next handler 
 }, (req, res) => {
    res.send('Hellow World!')
 }
);

const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res) => {
    console.log('three');
    res.send("done chaining")
}

app.get('/chain(.html)?', [one,two,three]);

//catch all, all other routes will be tested for a match before getting here. hello.com/anything*
app.get('/*', (req,res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //
 });
 
//always goes at end
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));