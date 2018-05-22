require("reflect-metadata");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { createConnection } = require("typeorm");
const AppRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

createConnection().then(async () => {
  app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    );
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type, Authorization, Content-Type",
    );
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
  });

  AppRoutes.forEach(route => {
    app[route.method](`/api${route.path}`, (request, response, next) => {
      route
        .action(request, response)
        .then(() => next)
        .catch(err => next(err));
    });
  });

  // // register routes
  // router.use("/users", async (req, res) => {
  //   console.log("app", "31");
  //   const firstUser = await connection
  //     .getRepository(User)
  //     .createQueryBuilder("user")
  //     .where("user.id = :id", { id: 5 })
  //     .getOne();
  //   return res.status(200).json({ message: firstUser });
  // });

  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send("404 not found.");
  });
});

module.exports = app;
