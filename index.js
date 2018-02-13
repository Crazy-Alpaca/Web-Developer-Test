const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()

// serve static assets normally
app.use(express.static(__dirname + '/public'))

// handle every other route with index.html, which will contain
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(port)

console.log("\nServer started" + ". Visit http://localhost:" + port)