const routes=require("express").Router()
const contactController= require("../controllers/ContactController")
routes.get("/contactus/:id",contactController.getContactById)
routes.post("/contactus",contactController.addContact)
routes.delete("/contactus/:id",contactController.deleteContact)

module.exports = routes