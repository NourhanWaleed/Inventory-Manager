const express = require('express')

const vendorRouter = require('./routers/vendor')

const app = express()

app.use(express.json())
app.use(vendorRouter)

module.exports = app
export{}