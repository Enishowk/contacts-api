const {
  registerUserAction,
  loginUserAction,
} = require("../controller/UserController");

const UserRoutes = [
  {
    path: "/user/register",
    method: "post",
    action: registerUserAction,
  },
  {
    path: "/user/login",
    method: "post",
    action: loginUserAction,
  },
];

module.exports = UserRoutes;
