const Sequalize = require('sequelize');
const sequelize = require('../config/database');



const Order = sequelize.define('customer_order', {
    order_id: {
        type: Sequalize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, status: {
        type: Sequalize.STRING,
        allowNull: true
    }, date: {
        type: Sequalize.DATE,
        allowNull: false
        }
        , time: {
            type: Sequalize.TIME,
            allowNull: false
        }
    
    , total_price: {
        type: Sequalize.DECIMAL,
        allowNull: true
    }, payment_method: {
        type: Sequalize.STRING,
        allowNull: true
    }, delivery_method: {
        type: Sequalize.STRING,
        allowNull: true
    }, cutomer_id: {
        type: Sequalize.INTEGER,
        allowNull: false
    }, isOrdered: {
        type: Sequalize.TINYINT,
        allowNull: true
    }

}, { timestamps: false, tableName: 'customer_order' });
module.exports = Order;
