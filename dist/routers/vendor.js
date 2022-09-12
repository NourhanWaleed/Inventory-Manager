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
const multer = require('multer');
const sharp = require('sharp');
const Vendor = require('../models/vendor');
const auth = require('../middleware/auth');
const router = new express.Router();
router.post('/vendors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const vendor = new Vendor(req.body);
    try {
        yield vendor.save();
        const token = yield vendor.generateAuthToken();
        res.status(201).send({ vendor, token });
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}));
router.post('/vendors/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield Vendor.findByCredentials(req.body.email, req.body.password);
        const token = yield vendor.generateAuthToken();
        res.send({ vendor, token });
    }
    catch (e) {
        res.status(400).send();
    }
}));
router.post('/vendors/logout', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.vendor.tokens = req.vendor.tokens.filter((token) => {
            return token.token !== req.token;
        });
        yield req.vendor.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
        console.log(e);
    }
}));
router.post('/vendors/logoutAll', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.vendor.tokens = [];
        yield req.vendor.save();
        res.send();
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.get('/vendors', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Vendor.find({}).then((vendors) => {
        res.send(vendors);
    }).catch((e) => {
        console.log(e);
    });
}));
router.get('/vendors/me', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(req.vendor);
}));
router.get('/vendors/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    yield Vendor.findById(_id).then((vendor) => {
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    }).catch((e) => {
        res.status(500).send();
    });
}));
router.patch('/vendors/me', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    //not working
    try {
        updates.forEach((update) => req.vendor[update] = req.body[update]);
        yield req.vendor.save();
        res.send(req.vendor);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}));
router.patch('/vendors/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {
        const vendor = yield Vendor.findById(req.params.id);
        updates.forEach((update) => vendor[update] = req.body[update]);
        yield vendor.save();
        if (!vendor) {
            return res.status(400).send();
        }
        res.send(vendor);
    }
    catch (e) {
        res.status(400).send(e);
    }
}));
router.delete('/vendors/me', auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield req.vendor.remove();
        res.send(req.vendor);
    }
    catch (e) {
        res.status(500).send();
    }
}));
router.delete('/vendors/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vendor = yield Vendor.findByIdAndDelete(req.params.id);
        if (!vendor) {
            return res.status(404).send();
        }
        res.send(vendor);
    }
    catch (e) {
        res.status(500).send;
    }
}));
module.exports = router;
//# sourceMappingURL=vendor.js.map