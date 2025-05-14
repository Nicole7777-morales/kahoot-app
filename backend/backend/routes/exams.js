const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const examsPath = path.join(__dirname, "./data/exams.son");

router.get("/", (req, res) => {
    const exams = JSON.parse(fs.readFileSync(examsPath));
    res.json(exams);
});


router.post("/", (req, res) => {
    const exam = req.body;
    const exams = JSON.parse(fs.readFileSync(examsPath));
    exam.id = Date.now();
    exams.push(exam);
    fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2));
    res.json({ message: "Examen creado"});
});
router.put("/:id", (req, res) => {
    const exams = JSON.parse(fs.readFileSync(examsPath));
    const index = exams.findIndex(e = e.id == req.params.id);
    if (index === -1) return res.status(404).json({error: "No encontrado"});
    exams[index] = {...exams[index], ...req.body };
    fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2));
    res.json({ message: "Examen actualizado"});
});


router.delete("/id", (req, res)=>{
    let exams = JSON.parse(fs.readFileSync(examsPath));
    exams = exams.filter(e => e.id != req.params.id);
    fs.writeFileSync(examsPath, JSON.stringify(exams, null, 2));
    res.json({message: "Examen eliminado"});
});
module.exports = router;