
const { json } = require('body-parser');
let express = require('express');
let app = express();
let bodyParser = require('body-parser')
require('dotenv').config()
// console.log("Hello World");
// app.listen(3000)
// let absolutePath = __dirname + path

let absolute = (path)=>{
    let absolutePath = __dirname + path
    return absolutePath
}
app.get('/', (req, res) => {
    res.sendFile(absolute("/views/index.html"))
});
app.use("/public", express.static(absolute("/public")))

app.get("/json", (req, res) => {
    let style = process.env.MESSAGE_STYLE
    let message = "Hello json"
    // let message = "prueba";
    if (style == 'uppercase') {
        message = message.toUpperCase();
    }
    res.json({"message":message})
})

app.use((req,res,next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    // express.static(req.method + " " + req.path + " - " + reqs.ip);
    next();
})


app.get("/now", (req,res,next) => {
    req.time = new Date().toString();
    next();
}, (req,res) => {
    res.json({time: req.time})
})

app.get(`/:word/echo`,(req, res, next) => {
    res.json({echo: req.params.word})
})

app.use("", bodyParser.urlencoded({extended: false}))

app.route('/name').get((req, res, next) => {
    let fName = req.body.first, lName = req.body.last;
    res.json({ name: `${fName} ${lName}` })
    next();
}).post((req, res) => {
    let fName = req.body.first, lName = req.body.last;

    res.json({ name: `${fName} ${lName}` })
})




























 module.exports = app;
