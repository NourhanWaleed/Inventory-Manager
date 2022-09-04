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
router.post('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
module.exports = router;
//# sourceMappingURL=item.js.map