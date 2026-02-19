const User=require('./userModal')
const Product=require('./productModal')
const Cart=require('./cartModal')
const CartItem=require('./cartItemModal')

User.hasOne(Cart,{foreignKey:"userId"})
Cart.belongsTo(User)

Cart.belongsToMany(Product,{through:CartItem})

Product.belongsToMany(Cart,{through:CartItem})


module.exports = {
  User,
  Product,
  Cart,
  CartItem
};