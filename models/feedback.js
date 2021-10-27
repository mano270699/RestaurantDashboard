const Sequalize=require('sequelize');
const sequelize=require('../config/database');



const Feedback = sequelize.define('feedback',{
    com_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
        
       
    },
    customer_id: {
        type: Sequalize.INTEGER,
        allowNull: false
    },
    
    meal_id: {
        type: Sequalize.STRING,
        allowNull: false
    },

    comment:{
        type: Sequalize.STRING,
        allowNull: false
    },rate:{
        type: Sequalize.INTEGER,
        allowNull: false

    },
    date_time:{
    type: Sequalize.DATE,
    allowNull: false

    }
    
},{ timestamps: false,tableName: 'customer_feedback' });
module.exports=Feedback;