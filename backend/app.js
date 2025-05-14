const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

//RUTAS
const usersRouter = require("./routes/users");
const examsRouter = require("./routes/exams");
const resultsRouter = require("/.routes/results");

app.use("/api/users", usersRouter);
app.use("/api/exams", examsRouter);
app.use("/api/results", resultsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);

});
