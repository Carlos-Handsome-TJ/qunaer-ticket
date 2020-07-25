const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (request, response) => {
    response.status(200)
    response.send('hello ~ express')
    response.end()
})
app.get('/city', (request, response) => {
    fs.readFile('./data/cities.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        response.json(JSON.parse(data))
    })
})

app.listen(8000)