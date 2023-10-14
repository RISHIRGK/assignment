require('dotenv').config()
const {Sequelize}=require('sequelize');
const sequelize = new Sequelize('main_db', process.env.DB_NAME,process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
} catch (error) {
    console.error('Unable to connect to the database:', error);
    
}
module.exports=sequelize;
