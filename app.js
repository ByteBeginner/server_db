const express = require("express");

const app = express();

app.use(express.json());


// DB Connection 
const corn = require("./db/corn");
corn();

// Routes
const routes = require("./routes/router");
app.use("/home",routes);





app.listen(3000, function () {
console.log("Servidor na porta 3000")
});



