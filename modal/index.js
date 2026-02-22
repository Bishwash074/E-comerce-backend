const User=require('./userModal')
const Product=require('./productModal')
const Cart=require('./cartModal')
const CartItem=require('./cartItemModal')
const Order = require("./orderModel");
const OrderItem = require("./orderItemModal");

User.hasOne(Cart,{foreignKey:"userId"})
Cart.belongsTo(User,{foreignKey:"userId"})

//  User - Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

//  Order - Product (Many-to-Many through OrderItem)
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

Cart.belongsToMany(Product,{through:CartItem})

Product.belongsToMany(Cart,{through:CartItem})


module.exports = {
  User,
  Product,
  Cart,
  CartItem
};