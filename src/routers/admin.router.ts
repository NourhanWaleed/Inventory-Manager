const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: '/admin'
})

/*const ADMIN = {
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: process.env.ADMIN_PASSWORD || 'wannabethecoolkid'
}*/

const router = AdminBroExpress.buildRouter(adminBro,/*{
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'stan-loona',
    authenticate: async (email: string,password: string) => {
        if (email === ADMIN.email && password === ADMIN.password){
            return ADMIN
        }
        return null
    }
}*/)

module.exports = router

export{}