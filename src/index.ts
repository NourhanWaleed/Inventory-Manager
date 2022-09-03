const app = require('./app')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000

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

  export{}