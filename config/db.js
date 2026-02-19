const {Sequelize}=require('sequelize');

require("dotenv").config();

const sequelize=new Sequelize(process.env.DATABASE_URL,{
  dialect:"postgres",
  logging:false
});

const connectDB=async()=>{
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL Connected sucessfully")
    require("../modal");
    await sequelize.sync({force:false,alter:false});
    console.log("Database Synced")
  } catch (error) {
    console.error("Database connection failed:",error)
    
  }
}
module.exports={sequelize,connectDB}