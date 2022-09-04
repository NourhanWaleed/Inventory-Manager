const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Vendor = require('../models/vendor')
//const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/vendors', async (req: any, res: any) => {
    const vendor = new Vendor(req.body)

    try {
        await vendor.save()
        const token = await vendor.generateAuthToken()
        res.status(201).send({ vendor, token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

router.post('/vendors/login', async(req: any, res: any) =>{
    try{
        const vendor = await Vendor.findByCredentials(req.body.email, req.body.password)
        const token = await vendor.generateAuthToken()
        res.send({vendor, token})
    }catch(e){
        res.status(400).send()
    }
})

router.get('/vendors',async (req: any, res: any) =>{
    await Vendor.find({}).then((vendors: any) =>{
        res.send(vendors)
    }).catch((e: any) =>{
        console.log(e)
    })
})

router.get('/vendors/:id', async (req: any, res: any) => {
    const _id = req.params.id
    await Vendor.findById(_id).then((vendor: any) =>{
        if(!vendor){
            return res.status(404).send()
        }
        res.send(vendor)
    }).catch((e: any) =>{
        res.status(500).send()
    })
})

router.patch('/vendors/:id', async(req: any,res:any) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
    
       const vendor = await Vendor.findById(req.params.id)
       updates.forEach((update) => vendor[update] = req.body[update])
       await vendor.save()
       if(!vendor){
            return res.status(400).send()
        }
        res.send(vendor)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/vendors/:id', async(req: any, res: any) => {
    try{
        const vendor = await Vendor.findByIdAndDelete(req.params.id)
            if(!vendor){
                return res.status(404).send()
            }
            res.send(vendor)
    } catch (e) {
res.status(500).send
    }
})

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
module.exports = router

export{}