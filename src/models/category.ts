const mongoose_cat = require('mongoose')
const Category = mongoose_cat.model('Category',{
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})
