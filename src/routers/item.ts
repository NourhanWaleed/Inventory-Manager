const express = require('express')
const Item= require('../models/item')
const router = new express.Router()

router.post('/items', async (req:any, res:any) =>{
    const item = new Item(req.body)
    try{
    await item.save()
    res.status(201).send({item})
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/items',async (req: any, res: any) =>{
    await Item.find({}).then((items: any) =>{
        res.send(items)
    }).catch((e: any) =>{
        console.log(e)
    })
})

router.get('/items/:id', async (req: any, res: any) => {
    const _id = req.params.id
    await Item.findById(_id).then((item: any) =>{
        if(!item){
            return res.status(404).send()
        }
        res.send(item)
    }).catch((e: any) =>{
        res.status(500).send()
    })
})

router.patch('/items/:id', async(req: any, res: any) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'category']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const item = await Item.findById(req.params.id)
       updates.forEach((update) => item[update] = req.body[update])
       await item.save()
        if(!item){
            return res.status(400).send()
        }
        res.send(item)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/items/:id', async(req: any, res: any) => {
    try{
        const item = await Item.findByIdAndDelete(req.params.id)
            if(!item){
                return res.status(404).send()
            }
            res.send(item)
    } catch (e) {
res.status(500).send()
    }
})

module.exports = router