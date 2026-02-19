const {DataTypes}=require('sequelize')
const {sequelize}=require('../config/db')

const Cart=sequelize.define("Cart",{
  userId:{
    type:DataTypes.UUID,
    allowNull:false
  }
})

module.exports = Cart;