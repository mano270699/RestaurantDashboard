const Sequalize=require('sequelize');
const sequelize=require('../config/database');



const Offer = sequelize.define('offer',{
    offer_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    old_price: {
        type: Sequalize.DECIMAL,
        allowNull: false
    },
    meal_id:{
        type: Sequalize.INTEGER,
      allowNull:false
    },
    cat_id:{
        type: Sequalize.INTEGER,
      allowNull:false
    },
    new_price:{
        type: Sequalize.DECIMAL,
        allowNull:false

    }

    
    
},{ timestamps: false,tableName: 'offer' });
module.exports=Offer;
