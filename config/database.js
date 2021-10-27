const Sequalize = require('sequelize');
//mysql://b184060e79a7fa:d8df056c@us-cdbr-east-02.cleardb.com/heroku_2e4591db34013b6?reconnect=true
/*const sequelize=new Sequalize('heroku_2e4591db34013b6','b184060e79a7fa','d8df056c',{
    hostname:'us-cdbr-east-02.cleardb.com',
    dialect:'mysql'
    });
    sequelize
.authenticate()
.then(()=>{
    console.log("connection has been established")
})
.catch((error)=>{
    console.log("connection hasn't been established yet :(")
})*/

/*
Server: sql7.freemysqlhosting.net
Name: sql7383375
Username: sql7383375
Password: 9VybsZnVs8
Port number: 3306 
*/

const Sequelize = require('sequelize');
const sequelize = new Sequelize('restaurant', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

});
sequelize
    .authenticate()
    .then(() => {
        console.log("connection has been established")
    })
    .catch((error) => {
        console.log("connection hasn't been established yet :(")
    })


module.exports = sequelize;

//mysql --host=us-cdbr-east-02.cleardb.com --user=b184060e79a7fa --password=d8df056c --reconnect heroku_2e4591db34013b6