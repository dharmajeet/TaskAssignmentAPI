const swaggerAutogen = require("swagger-autogen")();
const doc = {
  info: {
    version: "", // by default: '1.0.0'
    title: "", // by default: 'REST API'
    description: "", // by default: ''
  },
  host: "http://localhost:8080", // by default: 'localhost:3000'
  basePath: "", // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    // {
    //   name: "User Controller", // Tag name
    //   description: "users", // Tag description
    // },
    // {
    //   name: "other Controller", // Tag name
    //   description: "users", // Tag description
    // },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./app/routes/index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
