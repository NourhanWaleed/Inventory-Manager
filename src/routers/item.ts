const express = require('express')
const Item= require('../models/item')
const router = new express.Router()

router.post('/items/:id', async (req:any, res:any) =>{
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

module.exports = router