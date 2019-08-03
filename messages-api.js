const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let numOfRequest = 0

const failMiddleware = (req, res, next) => {
  if (!req.body.text || req.body.text === '') {
    res.status(400).json('Bad Request')
  }
  else {
    if (numOfRequest > 4) {
      res.status(429).json('Too Many Requests')
    }
    else {
      numOfRequest++
      next()
    }
    next()
  }
}

app.post('/messages', failMiddleware, (req, res, next) => {
  res.json({
    message: 'Message received loud and clear'
  })
})

app.listen(port, () => console.log(`This app listening on port ${port}!`))