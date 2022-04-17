const officersAssignment = require("../controllers/officersAssignmentController.js");
var router = require("express").Router();

// Create a new 
router.post("/", officersAssignment.create);

router.get("/", officersAssignment.findAll);

module.exports = router;
