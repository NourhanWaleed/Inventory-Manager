const express = require('express')
const Vendor = require('./models/vendor.ts')    //cant redclare it again
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
app.use(express.json())

app.post('/vendors', (req:any,res:any) => {
    const vendor = new Vendor(req.body)
    vendor.save().then(() => {
        res.send(vendor)
    }).catch((error: any) => {
console.log(error)
    })
})

export{}


//note: I know this is not the cleanest code I can write but it kept timingout and I found this solution on stackoverflow
async function start() {
    try {
      //Database Connect
      await mongoose.connect(
        'mongodb://127.0.0.1:27017/inventory-manager-api',
        {
        },
        () => {
          console.log("Database Connected");
        }
      );
  
      app.listen(3000, () => {
        console.log("Server is running on port 3000 ...");
      });
    } catch (error) {
      console.error(error);
    }
  }
  start()