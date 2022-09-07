"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const mongoose = require('mongoose');
AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin'
});
/*const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'wannabethecoolkid'
}*/
const router = AdminBroExpress.buildRouter(adminBro);
module.exports = router;
//# sourceMappingURL=admin.router.js.map