const express=require('express')
const { addToCart, getCart, UpdateCardItem } = require('../controllers/cartController')
const { isAuthenticated } = require('../middleware/authenticated')

const router=express.Router()


// add cartItem
router.post("/addCart",isAuthenticated,addToCart)
router.get("/getCart",isAuthenticated,getCart)
router.put("/Cartupdate/:productId",isAuthenticated,UpdateCardItem)

module.exports=router