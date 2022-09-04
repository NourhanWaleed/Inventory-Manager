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
const express = require('express');
const Item = require('../models/item');
const router = new express.Router();
router.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = new Item(req.body);
    try {
        yield item.save();
        res.status(201).send({ item });
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}));
router.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Item.find({}).then((items) => {
        res.send(items);
    }).catch((e) => {
        console.log(e);
    });
}));
router.get('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    yield Item.findById(_id).then((item) => {
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    }).catch((e) => {
        res.status(500).send();
    });
}));
router.patch('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'category'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const item = yield Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!item) {
            return res.status(400).send();
        }
        res.send(item);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    }
    catch (e) {
        res.status(500).send();
    }
}));
module.exports = router;
//# sourceMappingURL=item.js.map