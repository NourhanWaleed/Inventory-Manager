
const express = require('express')
const VendorX = require('./models/vendor')    //cant redclare it again
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/vendors', (req:any,res:any) => {
    const vendor = new VendorX(req.body)
    vendor.save().then(() => {
        res.send(vendor)
    }).catch(() => {

    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

