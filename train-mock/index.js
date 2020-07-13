
const express = require('express')
const app = express()
const fs = require('fs')

app.get('/', (request, response) => {
    response.status(200)
    response.send('hello ~ express')
    response.end()
})
app.get('/rest/city', (request, response) => {
    fs.readFile('./mock/rest/cities.json', (err, data) => {
        if (err) {
            console.log(err)
        }
        response.json(JSON.parse(data))
    })
})

app.listen(8000)

// const express = require('express');
// const path = require('path');
// const apiMocker = require('mocker-api');

// const app = express();

// apiMocker(app, path.resolve('./mocker/mocker.js'))
// app.listen(8000);