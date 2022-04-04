const db = require("../models");
const Assignments = db.assignment;
const Op = db.Sequelize.Op;
const { nanoid } = require("nanoid");
var moment = require("moment");
// Create and Save a new Assignment
exports.create = (req, res) => {
  const {
    id,
    subject,
    description,
    comment,
    satisfied,
    followUpDate,
    createdAt,
    updatedAt,
    assignToUserId,
    assignTo,
  } = req.body;
  // Create a assignment
  const assignmentId = nanoid();
  const assignment = {
    id,
    subject,
    description,
    comment,
    satisfied,
    followUpDate,
    createdAt,
    updatedAt,
    assignToUserId,
    assignTo,
    assignmentId,
  };

  // Save Assignment in the database
  Assignments.create(assignment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the assignment.",
      });
    });
};
// Retrieve all Assignments from the database.
exports.findAll = (req, res) => {
  const { assignToUserId = "", sortBy = "DESC", getBy = "" } = req.query;

  const getCondition1 = (param) => {
    switch (getBy) {
      case "Pending":
        break;
      case "UnAttended":
        break;
      case "Satisfied":
        return true;

      case "UnSatisfied":
        return false;
      default:
        break;
    }
  };

  const getCondition = () => {
    let result;
    if (assignToUserId == "" && getBy == "") {
      return (result = null);
    } else if (assignToUserId != "" && getBy == "") {
      result = { assignToUserId: { [Op.like]: `%${assignToUserId}%` } };
      return result;
    } else if (assignToUserId == "" && getBy != "") {
      result = { satisfied: { [Op.like]: getCondition1() } };
      return result;
    } else {
      result = {
        satisfied: { [Op.like]: getCondition1() },
        assignToUserId: { [Op.like]: `%${assignToUserId}%` },
      };
      return result;
    }
  };
  console.log(
    assignToUserId,
    "assignToUserIdassignToUserId",
    getBy,
    "jjjj",
    getCondition()
  );

  Assignments.findAll({
    where: getCondition(),
    order: [["followUpDate", sortBy]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Assignments.",
      });
    });
};

// Retrieve all Assignments Numbers from the database.
// nts.findPending);
// findUnAttended);
// findSatisfied);
// findUnsatisFied);

exports.findAssignmentsNumbers = (req, res) => {
  const {
    status = "",
    start = "",
    end = "",
    assignToUserId = "",
    orderBy = "DESC",
  } = req.query;

  // const DateFormate = (date) => {
  //   return (
  //     date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  //   );
  // };
  const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [year, month, day].join("-");
  };
  // console.log(
  //   start,
  //   "dhbj",
  //   end,
  //   moment(start).toDate(),
  //   "betweeeeeeeeeeennn",
  //   moment(end).toDate()
  // );
  // const getCondition = () => {
  //   let result;
  //   if (status == "Pending") {
  //     result = {
  //       followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
  //       satisfied: { [Op.like]: false },
  //     };
  //   } else if (status == "UnAttended") {
  //     if (start == "" && end == "") {
  //       result = {
  //         // followUpDate: { [Op.lt]: DateFormate(new Date()) },
  //         updatedBy: { [Op.ne]: "Admin" },
  //         followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },

  //         // satisfiedUpdate: { [Op.eq]: db.sequelize.col("updatedAt") },
  //         // satisfied: { [Op.like]: false },
  //       };
  //     } else if (start != "" && end == "") {
  //       result = {
  //         // followUpDate: { [Op.like]: DateFormate(new Date()) },
  //         // satisfied: { [Op.not]: true },
  //         updatedBy: { [Op.ne]: "Admin" },
  //         followUpDate: { [Op.like]: `${formatDate(start)}%` },
  //         // satisfiedUpdate: { [Op.eq]: db.sequelize.col("updatedAt") },
  //         // followUpDate: { [Op.like]: `%${start}%` },
  //       };
  //     } else if (start != "" && end != "") {
  //       result = {
  //         followUpDate: {
  //           [Op.between]: [moment(start).toDate(), moment(end).toDate()],
  //         },
  //         updatedBy: { [Op.ne]: "Admin" },
  //         // satisfiedUpdate: { [Op.eq]: db.sequelize.col("updatedAt") },
  //         // followUpDate: { [Op.like]: DateFormate(new Date()) },
  //         // satisfied: { [Op.like]: false },
  //       };
  //     }

  //     return result;
  //   } else if (status == "Satisfied") {
  //     if (start == "" && end == "") {
  //       result = {
  //         followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
  //         satisfied: { [Op.is]: true },
  //       };
  //     } else if (start != "" && end == "") {
  //       result = {
  //         // followUpDate: { [Op.like]: DateFormate(new Date()) },
  //         satisfied: { [Op.is]: true },
  //         followUpDate: { [Op.like]: `${formatDate(start)}%` },
  //       };
  //     } else if (start != "" && end != "") {
  //       result = {
  //         followUpDate: {
  //           [Op.between]: [moment(start).toDate(), moment(end).toDate()],
  //         },
  //         // followUpDate: { [Op.like]: DateFormate(new Date()) },
  //         satisfied: { [Op.is]: true },
  //       };
  //     }
  //     return result;
  //   } else if (status == "UnSatisfied") {
  //     if (start == "" && end == "") {
  //       result = {
  //         followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
  //         satisfied: { [Op.like]: false },
  //       };
  //     } else if (start != "" && end == "") {
  //       result = {
  //         // followUpDate: { [Op.like]: DateFormate(new Date()) },
  //         satisfied: { [Op.like]: false },
  //         followUpDate: { [Op.like]: `${formatDate(start)}%` },
  //       };
  //     } else if (start != "" && end != "") {
  //       result = {
  //         followUpDate: {
  //           [Op.between]: [moment(start).toDate(), moment(end).toDate()],
  //         },
  //         // followUpDate: { [Op.like]: DateFormate(new Date()) },
  //         satisfied: { [Op.like]: false },
  //       };
  //     }

  //     return result;
  //   }
  // };

  const getQuery = () => {
    let result;
    if (status == "Pending") {
      if (assignToUserId == "") {
        result = {
          followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
          satisfied: { [Op.like]: false },
        };
        return result;
      } else {
        result = {
          followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
          satisfied: { [Op.like]: false },
          assignToUserId: { [Op.like]: `%${assignToUserId}%` },
        };
        return result;
      }
    } else if (status == "UnAttended") {
      if (assignToUserId == "") {
        if (start == "" && end == "") {
          result = {
            updatedBy: { [Op.ne]: "Admin" },

            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            updatedBy: { [Op.ne]: "Admin" },

            followUpDate: { [Op.like]: `${formatDate(start)}%` },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },

            updatedBy: { [Op.ne]: "Admin" },
          };
          return result;
        }
      } else {
        if (start == "" && end == "") {
          result = {
            updatedBy: { [Op.ne]: "Admin" },

            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            updatedBy: { [Op.ne]: "Admin" },

            followUpDate: { [Op.like]: `${formatDate(start)}%` },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },

            updatedBy: { [Op.ne]: "Admin" },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        }
      }
    } else if (status == "Satisfied") {
      if (assignToUserId == "") {
        if (start == "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
            satisfied: { [Op.is]: true },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${formatDate(start)}%` },
            satisfied: { [Op.is]: true },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },
            satisfied: { [Op.is]: true },
          };
          return result;
        }
      } else {
        if (start == "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
            satisfied: { [Op.is]: true },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            satisfied: { [Op.is]: true },
            followUpDate: { [Op.like]: `${formatDate(start)}%` },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },
            satisfied: { [Op.is]: true },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        }
      }
    } else if (status == "UnSatisfied") {
      if (assignToUserId == "") {
        if (start == "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
            satisfied: { [Op.like]: false },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            satisfied: { [Op.like]: false },
            followUpDate: { [Op.like]: `${formatDate(start)}%` },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },
            satisfied: { [Op.like]: false },
          };
          return result;
        }
      } else {
        if (start == "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
            satisfied: { [Op.like]: false },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            satisfied: { [Op.like]: false },
            followUpDate: { [Op.like]: `${formatDate(start)}%` },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },
            satisfied: { [Op.like]: false },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        }
      }
    } else if (status == "") {
      if (assignToUserId == "") {
        if (start == "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${formatDate(start)}%` },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },
          };
          return result;
        }
      } else {
        if (start == "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${moment().format("YYYY-MM-DD")}%` },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end == "") {
          result = {
            followUpDate: { [Op.like]: `${formatDate(start)}%` },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        } else if (start != "" && end != "") {
          result = {
            followUpDate: {
              [Op.between]: [moment(start).toDate(), moment(end).toDate()],
            },
            assignToUserId: { [Op.like]: `%${assignToUserId}%` },
          };
          return result;
        }
      }
      // if (assignToUserId == "") {
      //   result = {};
      //   return result;
      // } else {
      //   result = {
      //     assignToUserId: { [Op.like]: `%${assignToUserId}%` },
      //   };
      //   return result;
      // }
    }
  };

  Assignments.findAll({
    where: getQuery(),
    order: [["followUpDate", orderBy]],
  })
    .then((data) => {
      res.send(data);
      // console.log(data[0], "data");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Assignments.",
      });
    });
};

// Find a single Assignments with an id
exports.findOne = (req, res) => {
  const { assignmentId = "" } = req?.params;

  Assignments.findOne({ where: { assignmentId: assignmentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Assignments with id=" + assignmentId,
      });
    });
};

// Update a Assignments by the id in the request
exports.update = (req, res) => {
  const { assignmentId = "" } = req?.params;

  Assignments.update(req.body, {
    where: { assignmentId: assignmentId },
  })
    .then((num) => {
      if (num == 1) {
        if (req.body?.satisfied) {
          Assignments.update(
            { satisfiedUpdate: new Date() },
            {
              where: { assignmentId: assignmentId },
            }
          );
        }
        res.send({
          message: "Assignments was updated successfully.",
        });
      } else {
        res.status(401).send({
          message: `Cannot update Assignments with id=${assignmentId}. Maybe Assignments was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Assignments with id=" + assignmentId,
      });
    });
};

// Delete a Assignment with the specified id in the request
exports.delete = (req, res) => {
  const { assignmentId = "" } = req?.params;
  console.log("deleteee", assignmentId);
  Assignments.destroy({
    where: { assignmentId: assignmentId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Assignment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Assignment with id=${assignmentId}. Maybe Assignment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Assignment with id=" + assignmentId,
      });
    });
};

exports.getSatisfied = (req, res) => {
  const { assignToUserId = "", sortBy = "DESC" } = req.query;
  console.log(assignToUserId, "assignToUserIdassignToUserId", req);
  var condition = assignToUserId
    ? { assignToUserId: { [Op.like]: `%${assignToUserId}%` } }
    : null;

  Assignments.findAll({ where: condition, order: [["followUpDate", sortBy]] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Assignments.",
      });
    });
};
