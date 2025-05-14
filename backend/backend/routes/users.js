const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const usersPath = path.join(__dirname, "./data/users.json");

router.post("/register",  (req, res) => {
    const { email, password,role } = req.body;
    const users = JSON.parse(fs.readFileSync(usersPath));
    if (users.find(u => u.email === email)) return res.status(400).json({ error: "El usuario ya existe"});
    users.push({ id: Date.now(), email, password, role});
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
    res.json({ message: "Registro exitoso!!"});
});

router.post("/login", (req, res) => {
    const{ email, password } = req.body;
    const users = JSON.parse(fs.readFileSync(usersPath));
    const user = users.find(u => u.email === email && u.pasword);
    if (!user) return res.status(401).json({ error: "Las credenciales son incorrectas"});
    res.json({ message: "Login existoso", user });
});
module.exports = router;