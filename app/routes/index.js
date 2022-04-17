const route = require("express").Router();
route.use("/users", require("./users.js"));
route.use("/assignment", require("./assignment.js"));
route.use("/officers_assignment", require("./officersAssignment.js"));

module.exports = route;
