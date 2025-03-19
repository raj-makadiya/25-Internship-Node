const routes = require("express").Router()

const serviceProviderController = require("../controllers/ServiceProviderController")
routes.get("/services",serviceProviderController.getAllService)

// routes.post("/user",userController.addUser)
routes.post("/service",serviceProviderController.signup)
routes.delete("/service/:id",serviceProviderController.deleteService)
routes.get("/service/:id",serviceProviderController.getServiceById)
routes.post("/service/login",serviceProviderController.loginService)


module.exports = routes