const Sequalize = require('sequelize');
const sequelize = require('../config/database');



const Customer = sequelize.define('customer', {
    customer_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false
    },

    full_name: {
        type: Sequalize.STRING,
        allowNull: false
    },password:{
        type: Sequalize.STRING,
        allowNull: false
    },
    address:{
        type: Sequalize.STRING,
        allowNull: true,
        defaultValue: null

    },
    birth_date:{
        type: Sequalize.DATE,
        allowNull: true,
        defaultValue: null

    },
    phone:{
        type: Sequalize.STRING,
        allowNull: false

    },cridet_card:{
        type: Sequalize.STRING,
        allowNull: true,
        defaultValue: null

    },image:{
        type: Sequalize.STRING,
        allowNull: true
    }
    ,Blocked:{
        type: Sequalize.TINYINT,
        allowNull: true
    }, token:{
        type: Sequalize.STRING,
        allowNull: true}

    


}, { timestamps: false, tableName: 'customer' });
module.exports = Customer;
