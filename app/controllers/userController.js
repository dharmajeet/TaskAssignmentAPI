const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;
const { v4: uuidv4 } = require("uuid");
const { nanoid } = require("nanoid");
// Create and Save a new User
exports.create = async (req, res) => {
  const {
    id,
    name,
    userName,
    active,
    password,
    designation,
    phone,
    createdAt,
    role,
    updatedAt,
  } = req.body;
  // Validate request

  // if (!req.body.name) {
  //   res.status(400).send({
  //     message: "name can not be empty!",
  //   });
  //   return;
  // }

  // checking userName
  const users = await Users.findOne({ where: { userName: userName } });
  if (users?.dataValues) {
    res.status(500).send({
      message: "username already taken",
    });
    return;
  }
  const userId = nanoid();
  // Create a user
  const user = {
    id,
    userId,
    name,
    userName,
    password,
    phone,
    role,
    active,
    designation,
    createdAt,
    updatedAt,
  };

  // Save User in the database
  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the users.",
      });
    });
};
// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  console.log("in user get");
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Users.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single user with an id
exports.findOne = (req, res) => {
  const { userId = "" } = req.params;

  Users.findOne({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + userId,
      });
    });
};

// Find a single user with an userName
exports.fetchUserByUserName = async (req, res) => {
  const { userName = "" } = req.params;
  Users.findOne({ where: { userName: userName } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with userName=" + userName,
      });
    });
};

exports.fetchUserByUserNameFunction = async (userName) => {
  console.log("contro", userName);
  const data = await Users.findOne({ where: { userName: userName } });
  return data;
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const { userId = "" } = req.params;
  console.log(req.body, "dddd", userId);

  Users.update(req.body, {
    where: { userId: userId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(401).send({
          message: `Cannot update User with userId=${userId}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating User with userId=" + userId,
      });
    });
};
