const sequelize = require("sequelize");

const db = new sequelize("crudnodejs", "root", "", {
    dialect: "mysql"
})

db.sync({});

//Agar bisa dipakai ke node js lainnya
module.exports = db;