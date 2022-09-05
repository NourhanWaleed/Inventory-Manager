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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Item = require('./item');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});
categorySchema.virtual('items', {
    ref: 'Item',
    localField: '_id',
    foreignField: 'category'
});
categorySchema.methods.toJSON = function () {
    const category = this;
    const categoryObject = category.toObject();
    return categoryObject;
};
//remove items when category is deleted 
categorySchema.pre('remove', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = doc;
        yield Item.deleteMany({ category: category._id });
        next();
    });
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
//# sourceMappingURL=category.js.map