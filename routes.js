const { registerUserAction } = require("./controller/UserController");

const AppRoutes = [
  {
    path: "/user/register",
    method: "post",
    action: registerUserAction,
  },
];

module.exports = AppRoutes;
