const mongoose= require('mongoose')
const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'category'
    },
    purchaseorderitem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase_Order_Item'
    }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item

export{}