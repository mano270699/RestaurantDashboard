const Sequalize=require('sequelize');
const sequelize=require('../config/database');



const Slider = sequelize.define('slider',{
    slide_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    meal_id: {
        type: Sequalize.INTEGER,
        allowNull: false
    },

    image:{
        type: Sequalize.STRING,
        allowNull: false
    }
    
},{ timestamps: false,tableName: 'slider' });
module.exports=Slider;
