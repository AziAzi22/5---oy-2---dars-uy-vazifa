const app = require("express")();
const cors = require("cors");
const express = require("express");
const dataRouter = require("./routes/data.routes");
const upload = require("./utils/multer");
const uploadRouter = require("./routes/upload.routes");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
require("dotenv").config();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

/// routes
app.use(dataRouter);
app.use(uploadRouter);

/// upload
app.use("/images", express.static("upload/images"));

http.listen(PORT, () => {
  console.log("server is running on port:", +PORT);
});
