"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const vendorRouter = require('./routers/vendor');
const itemRouter = require('./routers/item');
const categoryRouter = require('./routers/category');
const app = express();
app.use(express.json());
app.use(vendorRouter);
app.use(itemRouter);
app.use(categoryRouter);
module.exports = app;
//# sourceMappingURL=app.js.map