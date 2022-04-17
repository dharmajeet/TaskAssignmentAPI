const db = require("../models");
const OfficersAssignments = db.officersAsssignment;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const {
    id,
    description,
    followUpDateOfficer,
    assignToOfficer,
    place,
    createdAt,
    updatedAt,
  } = req.body;

  let assignTo = [];
  const officers = assignToOfficer.split(",");
  officers?.map((office, index) => {
    assignTo.push(office);
  });


  date = new Date(followUpDateOfficer);
year = date.getFullYear();
month = date.getMonth()+1;
dt = date.getDate();

if (dt < 10) {
  dt = '0' + dt;
}
if (month < 10) {
  month = '0' + month;
}
  followUpDate = year+'-' + month + '-'+dt
  // const assignmentId = nanoid();
  const assignment = {
    id,
    description,
    followUpDate,
    assignTo,
    place,
    createdAt,
    updatedAt,
  };

  // Save Assignment in the database
  OfficersAssignments.create(assignment)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the assignment.",
      });
    });
};

exports.findAll = (req, res) => {
  const followUpDate = req.query.followUpDate;

  const condition = followUpDate
    ? { followUpDate: { [Op.like]: `%${followUpDate}%` } }
    : null;

  OfficersAssignments.findAll({ where: condition })
    .then((data) => {
      let assign = [];
      data?.map((data, index) => {
        const newA = {
          assignTo: JSON.parse(data?.assignTo),
        };

        Object.assign(data, newA);
        const newArray = data;

        assign.push(newArray);
      });

      res.send(assign);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
