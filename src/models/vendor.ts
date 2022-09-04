const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Purchase_Order = require('./purchaseorder')
const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: () => Promise.resolve(true),
            message: 'Email validation failed'
          
    }
},
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
       
    },
    /*tokens: [{
        token: {
            type: String,
            required: true
        }
    }]*/
})

vendorSchema.virtual('purchaseorders',{
    ref: 'Purchase_Order',
    localField: '_id',
    foreignField: 'vendor'
})

vendorSchema.methods.toJSON = function () {
    const vendor = this
    const vendorObject = vendor.toObject()
    delete vendorObject.password
    delete vendorObject.tokens
    return vendorObject
}

vendorSchema.methods.generateAuthToken = async function () {
    const vendor = this
    const token = jwt.sign({ _id: vendor._id.toString() }, process.env.JWT_SECRET)

    vendor.tokens = vendor.tokens.concat({ token })
    await vendor.save()

    return token
}

vendorSchema.statics.findByCredentials = async function(email: string| any, password: string|any) {
    const vendor = await Vendor.findOne({ email })

    if (!vendor) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, vendor.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return vendor
}

// Hash the plain text password before saving
vendorSchema.post('save', async function (doc:any,next:any) {
    const vendor = doc

    if (vendor.isModified('password')) {
        vendor.password = await bcrypt.hash(vendor.password, 8)
    }

    next()
})


//delete vendor's orders when they're removed
vendorSchema.post('remove', async function (doc:any,next:any) {
    const vendor = doc
    await Purchase_Order.deleteMany({ owner: vendor._id })
    next()
})

const Vendor = mongoose.model('Vendor', vendorSchema)
module.exports = Vendor
