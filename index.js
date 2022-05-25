const express = require('express');
const http = require('http');

require('dotenv').config();
const path = require("path");
const bodyParser = require('body-parser');
const {
    sql,
    pool_server_business
} = require("./utilities/sql_connection.js");

function hi() {
    console.log('hi')
}

let app = express();
const server = http.createServer(app);
let hostname = process.env.NODE_HOST;
let port = process.env.NODE_PORT;
const lib = require('./utilities/functions.js')

const cors = require('cors');
const { resourceLimits } = require('worker_threads');

app.use(cors({
    origin: '*'
}));


//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.post('/esegui', async (req, res) => {
    let name = req.body.title
    let job = await lib.runJob(name)
    res.status(200)
})

app.post('/info', async (req, res) => {
    let name = req.body.title
    let value = await lib.jobInfo(name)
    res.status(200).send(value)
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
