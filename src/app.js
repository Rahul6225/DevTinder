const express = require("express");
const app = express();
require("./configs/db.js");
const { ConnectDB } = require("./configs/db.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/userRouters.js");

//most of the Api getting data or posting data return a  promise then we have to put into async await
//Orders of the routes matters a lot

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
// app.use("/", connectionRouter);

ConnectDB()
  .then(() => {
    console.log("DataBase connected Succesfully");
    app.listen(4000, () => {
      console.log("Server is Running");
    });
  })
  .catch((err) => {
    console.log("Database failed to connect");
  });
