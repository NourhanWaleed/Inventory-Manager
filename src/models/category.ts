const mongoose = require('mongoose')
const Item = require('./item')
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})
categorySchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'category'
})

categorySchema.methods.toJSON = function () {
    const category = this
    const categoryObject = category.toObject()

    return categoryObject
}


//remove items when category is deleted 
categorySchema.post('remove', async function (doc:any, next:any) {
    const category = doc
    console.log(category)
    const deleted =await Item.deleteMany({ category: category._id })
    console.log(deleted)
    next()
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category


export{}