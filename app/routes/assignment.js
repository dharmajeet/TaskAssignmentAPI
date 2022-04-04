const assignments = require("../controllers/assignmentController.js");
var router = require("express").Router();

// Create a new Tutorial
router.post("/", assignments.create);

// Retrieve all assignments
router.get("/", assignments.findAll);

router.get("/pending", assignments.findAssignmentsNumbers);
// router.get("/unAttended", assignments.findUnAttended);
// router.get("/satisfied", assignments.findSatisfied);
// router.get("/unsatisFied", assignments.findUnsatisFied);

// // get satisfied
// router.get("/", assignments.findAll);

// Retrieve a single assignments with id
router.get("/:assignmentId", assignments.findOne);

// Update a assignments with id
router.put("/:assignmentId", assignments.update);

// Delete a assignment with id
router.delete("/:assignmentId", assignments.delete);
module.exports = router;
