const Sequalize=require('sequelize');
const sequelize=require('../config/database');



const Cat = sequelize.define('category',{
    cat_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    cat_name: {
        type: Sequalize.STRING,
        allowNull: false
    },

    cat_image:{
        type: Sequalize.STRING,
        allowNull: false
    }
    
},{ timestamps: false,tableName: 'category' });
module.exports=Cat;
