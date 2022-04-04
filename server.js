const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const swaggerUi = require("swagger-ui-express");

swaggerDocument = require("./swagger.json");

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })
);

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync().then((err) => {
  // console.log(err, "errror");
});
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

// app.get("/learners", (req, res) => {
//   db.sequelize.query("SELECT * FROM learner.tutorials", (err, rows, fields) => {
//     if (!err) res.send(rows);
//     else console.log(err);
//   });
// });

app.get("/api/data", cors(), (req, res) => {
  const data = { id: 1, firstName: "John", lastName: "Doe" };
  console.log(data);
  res.json(data);
});

// require("./app/routes/turorial.routes")(app);
// require("./app/routes")(app);
app.use("/", require("./app/routes"));

// set port, listen for requests
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
