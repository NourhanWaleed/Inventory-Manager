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

module.exports = router