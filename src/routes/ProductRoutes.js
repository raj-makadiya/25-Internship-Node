const routes = require("express").Router()

const productController = require("../controllers/ProductController")
routes.get("/products",productController.getAllProduct)
routes.get("/productbybusinessid/:businessId",productController.getAllProductByBusinessId)
routes.post("/product",productController.addProduct)
routes.get("/getProductById/:id",productController.getProductById);


routes.delete("/product/:id",productController.deleteProduct)
routes.get("/product/:id",productController.getProductByUserId)
routes.post("/addWithFile",productController.addProductWithFile)
routes.put("/updateproduct/:id",productController.updateProduct);
routes.get("/getProductByCategory/:category",productController.getAllProductByCategory)



module.exports = routes