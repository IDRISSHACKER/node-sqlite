const express = require('express'); 
const sqlite = require("sqlite3")
const router = require("express").Router()

let db = new sqlite.Database("database.sqlite", (err, db) => {
    if (err) {
        console.log("Connexion impossible")
    }
    console.log(db)
})

//db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), domain VARCHAR(255));")
// db.run("INSERT INTO users(name, domain) VALUES('Elon Musk', 'seo of tesla'),('Mark Zukerberg', 'Fondater of facebook'),('Jeft Bezos', 'fondater of amazon');")

const setUser = async(user={})=>{
    return db.run(`INSERT INTO users(name, domain) VALUES("${user.username}", "${user.activiti}")`)
}


const removeUser = (id)=>{
    return db.run(`DELETE FROM users WHERE id = "${id}"`)
}

const getUser = (id, fetcher) => {
    db.get(`SELECT * FROM users WHERE id = "${id}"`, (err, row) => {
        if (err) {
            console.log(err)
        }

        fetcher(row)
    })
}


router.get("/", (req, res)=>{
    const query = req.query

    console.log(query.id)
    getUser(query.id, (row)=>{
        res.status(200).json(row)
    })
})

router.get("/users", async(req, res) => {
    db.all("SELECT * FROM users", (err, users) => {
        if (err) {
            console.log(err)
        }
        res.status(200).json(users)
    })
})

router.get("/users/:user", async (req, res) => {

    const id = req.params.user
    db.get(`SELECT * FROM users WHERE id = "${id}"`, (err, user) => {
        if (err) {
            res.status("500").send("Err post validities")
        }
        res.status(200).json(user)
    })

})

router.get("/users/setUser/:user", async(req, res)=>{
    console.log(req.get('domain'))
    const username = req.params.user
    const activiti = "Programmer"

    const form = {
        username,
        activiti
    }

    setUser(form)

    res.status(200).send(`${username} added to <a href="/api/users">users</a>`)

})

router.get("/users/removeUser/:id", async (req, res) => {
    const id = req.params.id

    removeUser(id)

    res.status(200).send(`return to <a href="/api/users">users</a>`)

})



//db.close(err=>err ?? console.log(err))

module.exports = router