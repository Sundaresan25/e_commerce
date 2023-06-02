const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const EmployeeRoute = require("./routes/employee");
const AuthRoute = require("./routes/auth");
const ProductRoute = require("./routes/product");

const uri =
  "mongodb+srv://Sundar:Sundar123@cluster0.f9qmyrj.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.on("open", (err) => {
  console.log("DB Established");
});

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uplods", express.static("uplods"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

app.use("/api/employee", EmployeeRoute);
app.use("/api", AuthRoute);
app.use("/api", ProductRoute);
