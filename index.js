var express = require('express')
var app = express()


app.get('/', async (req, res) => {
    res.send("hello world")
})

app.listen('8080', async (req, res) => {
    console.log('server started')
})
console.log("hello heroku")