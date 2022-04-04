const route = require("express").Router();
route.use("/users", require("./users.js"));
route.use("/assignment", require("./assignment.js"));

module.exports = route;
