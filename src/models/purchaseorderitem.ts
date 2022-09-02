const mongoose = require('mongoose')
const Item = require('./item.ts')
const purchaseorderitemSchema = new mongoose.Schema({
    purchaseOrder: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Purchase_Order'
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    pricePerItem: {
        type: Number,
        default: 0.0,
        required: true
    }
})
purchaseorderitemSchema.virtual('item', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'purchaseorderitem'
})

purchaseorderitemSchema.methods.toJSON = function () {
    const poi = this
    const poiObject = poi.toObject()
    return poiObject
}
const Purchase_Order_Item = mongoose.model('Purchase_Order_Item', purchaseorderitemSchema)

module.exports = Purchase_Order_Item

export{}