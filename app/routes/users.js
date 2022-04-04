const users = require("../controllers/userController");
var router = require("express").Router();

// Create a new Tutorial
router.post("/", users.create);
// Retrieve all users
router.get("/", users.findAll);

// Retrieve a single user with id
router.get("/:userId", users.findOne);
router.get("/userName/:userName", users.fetchUserByUserName);
// Update a User with id
router.put("/:userId", users.update);

router.post(
  "/login",
  // validateUserLoginInput,
  async (req, res) => {
    console.log("helooo from login API");
    const { userName = "", password = "" } = req?.body;
    console.log(userName, "boddddy", req?.body);
    const usersData = await users.fetchUserByUserNameFunction(userName);
    console.log(usersData, "usersData");
    if (!usersData) {
      return res.json({
        is_success: false,
        msg: "User not found",
      });
    }

    //Check Password
    if (password === usersData.password) {
      res.json({
        is_success: true,
        msg: "Login Successfully",
        user: usersData,
      });
    } else {
      res.json({ is_success: false, msg: "password Incorrect" });
    }
  }
);

module.exports = router;
