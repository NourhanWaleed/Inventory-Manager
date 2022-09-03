"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Item = require('./item');
const Purchase_OrderSchema = new mongoose.Schema({
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Vendor'
    },
});
Purchase_OrderSchema.virtual('purchaseorderitem', {
    ref: 'Purchase_Order_Item',
    localField: '_id',
    foreignField: 'purchase_order'
});
Purchase_OrderSchema.methods.toJSON = function () {
    const po = this;
    const poObject = po.toObject();
    return poObject;
};
const Purchase_Order = mongoose.model('Purchase_Order', Purchase_OrderSchema);
module.exports = Purchase_Order;
//# sourceMappingURL=purchaseorder.js.map