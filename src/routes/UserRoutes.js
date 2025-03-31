const routes = require("express").Router()
const userController= require("../controllers/UserController")
routes.get("/users",userController.getAllUsers)
//routes.post("/user",userController.addUser)
//routes.post("/user",userController.addUser1)
routes.delete("/user/:id",userController.deleteUser)
routes.get("/user/:id",userController.getUserById)
routes.post("/user",userController.signUp)
routes.post("/user/login",userController.loginUser)
routes.post("/forgotpassword",userController.forgotPassword)
routes.post("/resetPassword",userController.resetPassword)


//v-imp
module.exports = routes