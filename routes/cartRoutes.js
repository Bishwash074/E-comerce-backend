const express=require('express')
const { addToCart, getCart, UpdateCardItem, deleteCartItem } = require('../controllers/cartController')
const { isAuthenticated } = require('../middleware/authenticated')

const router=express.Router()


// add cartItem
router.post("/addCart",isAuthenticated,addToCart)
router.get("/getCart",isAuthenticated,getCart)
router.put("/CartItemupdate/:productId",isAuthenticated,UpdateCardItem)
router.delete("/deletecartItem/:productId",isAuthenticated,deleteCartItem)

module.exports=router