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
const Vendor = require('./models/vendor.ts'); //cant redclare it again
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
app.use(express.json());
app.post('/vendors', (req, res) => {
    const vendor = new Vendor(req.body);
    vendor.save().then(() => {
        res.send(vendor);
    }).catch((error) => {
        console.log(error);
    });
});
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Database Connect
            yield mongoose.connect('mongodb://127.0.0.1:27017/inventory-manager-api', {}, () => {
                console.log("Database Connected");
            });
            app.listen(3000, () => {
                console.log("Server is running on port 3000 ...");
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
start();
