var express = require('express');
var routesql = require('./route/route_mysql')
var app = express();
app.use(routesql);


app.get('/', (req, res)=>{
    res.send('<h1>Express MySQL ALI JC06</h1>')
})


app.listen(5000, ()=>{
    console.log('Server Actived in Port 5000!')
})