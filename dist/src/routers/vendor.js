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
//const auth = require('../middleware/auth')
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
router.get('/vendors', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Vendor.find({}).then((vendors) => {
        res.send(vendors);
    }).catch((e) => {
        console.log(e);
    });
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
/*
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancellationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})
*/
module.exports = router;
//# sourceMappingURL=vendor.js.map