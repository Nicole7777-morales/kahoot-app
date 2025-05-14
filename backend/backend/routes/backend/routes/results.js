const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const resultsPath = path.join(__dirname, "./data/results.json");

router.post("/submit", (req, res) =>{
    const result = req.body;
    const results = JSON.parse(fs.readFileSync(resultsPath));
    result.id = Datenow();
    results.push(result);
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    res.json({ message: "Respuestas guardadas"});
});

router.get("/users/:userId", (req, res) => {
    const results = JSON.parse(fs.readFileSync(resultsPath));
    const userResults = results,filter(r => r.userId == req.params.userId);
    res.json(userResults);
});
module.exports = router;