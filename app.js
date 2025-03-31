const express= require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const router = express.Router();

const app = express()
app.use(cors())
app.use(express.json())

router.post("/user", (req, res) => {
    console.log("Received data:", req.body); // Log the incoming data

    // Mock response
    res.status(201).json({ message: "User data received", data: req.body });
});

const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)

 const contactRoutes=require("./src/routes/ContactRoutes")
app.use(contactRoutes)

const serviceProviderRoutes = require("./src/routes/ServiceProviderRoutes")
app.use(serviceProviderRoutes)

const productRoutes = require("./src/routes/ProductRoutes")
app.use("/product",productRoutes)

const complaintRoutes = require("./src/routes/ComplaintsRoutes")
app.use("/complaint",complaintRoutes)

const ratingRoutes = require("./src/routes/RatingRoutes")
app.use("/rating",ratingRoutes)

const discussionRoutes = require("./src/routes/ForumDiscussionsRoutes")
app.use("/discussion",discussionRoutes)

const categoryRoutes = require("./src/routes/CategoryRoutes")
app.use("/category",categoryRoutes)

const notificationRoutes = require("./src/routes/NotificationsRoutes")
app.use("/notification",notificationRoutes)

mongoose.connect("mongodb://127.0.0.1:27017/25_node_intership").then(()=>{
    console.log("database connected....")
})


const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port  number",PORT)
})

module.exports = router;


