const express = require('express')
const Category = require('../models/category')
const router = new express.Router()

router.post('/categories', async (req:any, res:any) =>{
    const category = new Category(req.body)
    try{
    await category.save()
    res.status(201).send({category})
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.get('/categories',async (req: any, res: any) =>{
    await Category.find({}).then((categories: any) =>{
        res.send(categories)
    }).catch((e: any) =>{
        console.log(e)
    })
})

router.get('/categories/:id', async (req: any, res: any) => {
    const _id = req.params.id
    await Category.findById(_id).then((category: any) =>{
        if(!category){
            return res.status(404).send()
        }
        res.send(category)
    }).catch((e: any) =>{
        res.status(500).send()
    })
})

module.exports = router

export{}