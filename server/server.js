const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
const logger = require("morgan");
const dotenv = require("dotenv");

const connectDb = require("./config/connectDb");
const { errorHandler, notFound } = require("./middlewares/errorMiddleWare");
const PORT = process.env.PORT || 5000;
dotenv.config();

//database
connectDb();

//routes

//middlewares

app.use(
  cors({
    origin: "*",
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//apply routes

app.use("/api/users", userRoutes);

//  not found middleWare
app.use(notFound);
// error handler middleware
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
