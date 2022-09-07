const express = require('express')

const vendorRouter = require('./routers/vendor')
const itemRouter = require('./routers/item')
const categoryRouter = require('./routers/category')
const adminRouter = require('./routers/admin.router')

const app = express()

app.use(express.json())
app.use(vendorRouter)
app.use(itemRouter)
app.use(categoryRouter)
app.use('/admin',adminRouter)
module.exports = app
export{}