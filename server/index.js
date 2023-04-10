const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require("cors");


app.use(cors());
//新写法
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

app.use('/api',router);

app.use(express.static("upload"));

app.listen(3000,()=>{
    console.log('服务器运行在3000端口!');
});