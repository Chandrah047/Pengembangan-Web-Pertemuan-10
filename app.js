const express = require("express");
const app = express();

//memanggill config
const db = require("./config/db");

//memanggil user
const User = require("./models/User");

app.get("/", (req, res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({extended: true }));

//mengautentikasinya (untuk menghubungkan antara node js dengan database sql)
db.authenticate().then(() => console.log("berhasil terkoneksi dengan database"))

//agar tidak perlu mengulang lagi "const.username = req.body" dan sebagainya 
app.post("/crud", async (req,res) => {
    try {
        const {username, email, password } = req.body;

        //fungsi membuat const newUser untuk mentransfer data ke database
        const newUser = new User({
            username, email, password
        })

        await newUser.save();

        //memanggilnya lagi di respon json dengan cara :
        res.json(newUser);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})

//membuat router get all user
app.get("/crud", async (req,res) => {
    try{
        const getAllUser = await User.findAll({})

        res.json(getAllUser)

    }catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//membuat router get a user
app.get("/crud/:id", async (req,res) => {
    try{
        const id = req.params.id

        const getUser = await User.findOne({
            where: { id:id }
        })

        res.json(getUser)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//membuat router delete
app.delete("/crud/:id", async (req,res) => {
    try{
        const id = req.params.id

        const deleteUser = await User.destroy({
            where: { id:id }
        })

        await deleteUser;

        res.json("berhasil di hapus")
    }catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

//membuat router update
app.put("/crud/:id", async (req,res) => {
    try{
        const {username, email, password } = req.body;
        const id = req.params.id

        const updateUser = await User.update(
        {
            username, 
            email, 
            password
        }, 
        {where : { id:id }} );

        await updateUser;

        res.json("berhasil di update")
    }catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})


app.listen(4500, () => console.log("port berjalan di 4500"));