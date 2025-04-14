const express = require("express");
const morgan = require("morgan");
const path = require("path")

const UserRoutes = require("./routes/home")

const app = express();

//Middleware

app.use(morgan("dev"));
app.use(express.json());

app.use(UserRoutes)

//Static

app.use("/static", express.static(path.join(__dirname, "static")));

//Settings
app.set("appName", "Express RestAPI");
app.set("port", 3000);

app.listen(3000);
console.log(
  `Server ${app.get("appName")} is listening on port http://localhost:${app.get(
    "port"
  )}`
);
