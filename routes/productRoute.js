const express=require("express")
const {isAuthenticated}=require("../middleware/authenticated")
const { createProduct, updateProduct, deleteProduct, getAllProducts, getaProduct } = require("../controllers/productController")
const { isAdmin } = require("../middleware/rolebased")

const router=express.Router()

// Admin
router.post('/createProduct',isAuthenticated,isAdmin,createProduct)
router.put("/updateProduct/:id",isAuthenticated,isAdmin,updateProduct)
router.delete('/deleteProduct/:id',isAdmin,isAuthenticated,deleteProduct)

// Public
router.get('/getAll',getAllProducts)
router.get('/getsingle/:id',getaProduct)

module.exports=router