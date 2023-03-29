const express = require("express");

const app = express();

app.use(express.json());


// DB Connection 
const corn = require("./db/corn");
corn();

// Models


// Public Routes
const routes = require("./routes/router");
app.use("/home",routes);

const register = require("./routes/register");
app.use("/home/auth/register",register);

const login = require("./routes/login");
app.use("/home/auth/login",login);


app.listen(3000, function () {
console.log("Servidor na porta 3000")
});



