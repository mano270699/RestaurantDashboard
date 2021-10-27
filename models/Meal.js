const Sequalize = require('sequelize');
const sequelize = require('../config/database');
const Cat = require('../models/Cat');




const Meal = sequelize.define('meal', {
    meal_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    meal_name: {
        type: Sequalize.STRING,
        allowNull: false
    },
    meal_image: {
        type: Sequalize.STRING,
        allowNull: false
    },
    cat_id: {
        type: Sequalize.INTEGER,
        allowNull: false
    },
    meal_price: {
        type: Sequalize.DECIMAL,
        allowNull: false
    },
   old_price: {
        type: Sequalize.DECIMAL,
        allowNull: false
    },
    description: {
        type: Sequalize.STRING,
        allowNull: false

    },


}, { timestamps: false, tableName: 'meal_product' });

module.exports = Meal;
