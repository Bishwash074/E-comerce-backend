const express=require('express')
const { addToCart, getCart } = require('../controllers/cartController')
const { isAuthenticated } = require('../middleware/authenticated')

const router=express.Router()



router.post("/addCart",isAuthenticated,addToCart)
router.get("/getCart",isAuthenticated,getCart)

module.exports=router