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
const express = require('express');
const Category = require('../models/category');
const router = new express.Router();
router.post('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = new Category(req.body);
    try {
        yield category.save();
        res.status(201).send({ category });
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}));
router.get('/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Category.find({}).then((categories) => {
        res.send(categories);
    }).catch((e) => {
        console.log(e);
    });
}));
router.get('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    yield Category.findById(_id).then((category) => {
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    }).catch((e) => {
        res.status(500).send();
    });
}));
router.patch('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const category = yield Category.findById(req.params.id);
        updates.forEach((update) => category[update] = req.body[update]);
        yield category.save();
        if (!category) {
            return res.status(400).send();
        }
        res.send(category);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/categories/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category.findById(req.params.id);
        console.log(category);
        category.remove();
        if (!category) {
            return res.status(404).send();
        }
        res.send(category);
    }
    catch (e) {
        res.status(500).send();
        console.log(e);
    }
}));
module.exports = router;
//# sourceMappingURL=category.js.map