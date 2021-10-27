const Sequalize =require('sequelize');
const sequelize=require('../config/database');




const User = sequelize.define('user',{

 admin_id:{
    type: Sequalize.INTEGER,
    primaryKey: true,
    autoIncrement: true

    },
    admin_name:{
        type:Sequalize.STRING,
    allowNull:false

    },
email:{
    type:Sequalize.STRING,
    allowNull:false
},
password:{

    type:Sequalize.STRING,
    allowNull:false

},
admin_image:{
    type:Sequalize.STRING,
    allowNull:false

}




},{ timestamps: false,tableName: 'admin' });
module.exports=User;