const registerUserAction = require("./controller/registerUserAction");

const AppRoutes = [
  {
    path: "/user/register",
    method: "post",
    action: registerUserAction,
  },
];

module.exports = AppRoutes;
