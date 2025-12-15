const {Router} = require("express");
const { getData, addData, deleteData } = require("../controller/data.controller");

const dataRouter = Router();
dataRouter.get("/get_data", getData)
dataRouter.post("/add_data", addData)
dataRouter.delete("/delete_data/:id", deleteData)

module.exports = dataRouter