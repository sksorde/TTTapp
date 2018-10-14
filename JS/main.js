const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
//app.post('/', function(req, res){res.send('This is Post request')})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))