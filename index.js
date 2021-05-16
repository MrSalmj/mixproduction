var express = require('express')
var app = express()


app.get('', async (req, res) => {
    res.send("hello world")
})

app.listen(process.env.PORT || 3000, async (req, res) => {
    console.log('server started')
})
console.log("hello heroku")