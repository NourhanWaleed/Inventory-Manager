"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Purchase_Order = require('./purchaseorder');
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
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
vendorSchema.virtual('purchaseorders', {
    ref: 'Purchase_Order',
    localField: '_id',
    foreignField: 'vendor'
});
vendorSchema.methods.toJSON = function () {
    const vendor = this;
    const vendorObject = vendor.toObject();
    delete vendorObject.password;
    delete vendorObject.tokens;
    return vendorObject;
};
vendorSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const vendor = this;
        const token = jwt.sign({ _id: vendor._id.toString() }, process.env.JWT_SECRET);
        vendor.tokens = vendor.tokens.concat({ token });
        yield vendor.save();
        return token;
    });
};
vendorSchema.statics.findByCredentials = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const vendor = yield Vendor.findOne({ email });
        if (!vendor) {
            throw new Error('Unable to login');
        }
        const isMatch = yield bcrypt.compare(password, vendor.password);
        if (!isMatch) {
            throw new Error('Unable to login');
        }
        return vendor;
    });
};
// Hash the plain text password before saving
vendorSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const vendor = this;
        if (vendor.isModified('password')) {
            vendor.password = yield bcrypt.hash(vendor.password, 8);
        }
        next();
    });
});
//delete vendor's orders when they're removed
vendorSchema.post('remove', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const vendor = doc;
        yield Purchase_Order.deleteMany({ owner: vendor._id });
        next();
    });
});
const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;
//# sourceMappingURL=vendor.js.map