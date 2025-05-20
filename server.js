const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')
// const multer = require('multer')
// const path = require('path')
const http = require('http')

require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
// const UPLOADS_DIR = process.env.UPLOADS_DIR
// const PUBLIC_DIR = path.join(__dirname, process.env.PUBLIC_DIR)

let app = express()

const server = http.createServer(app)

mongoose.connect(MONGODB_URI)

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

app.use(cors())

app.use(
  express.urlencoded({
    extended: true,
    limit: '50mb'
  })
)
app.use(
  express.json({
    limit: '50mb'
  })
)

// app.use(express.static(PUBLIC_DIR));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, UPLOADS_DIR))
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.originalname.replace(/ /g, '_') +
//         '-' +
//         new Date().valueOf() +
//         path.extname(file.originalname)
//     )
//   }
// })

// const upload = multer({ storage })
// global.upload = upload

app.use('/', require('./routes'))

// app.get("*", function (req, res) {
//   res.sendFile(PUBLIC_DIR + "/index.html");
// });

// make required dirs
// const directories = [UPLOADS_DIR]
// require('./utils/mkdirSync')(directories)

server.listen(PORT, err => {
  if (err) throw err
  console.info('Listening on port ' + PORT + '...')
})
