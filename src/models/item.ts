const mongoose_it = require('mongoose')
const Item = mongoose_it.model('Item', {
    name:{
        type: String,
        required:true,
        trim: true
    }
})
