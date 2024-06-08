const path = require("path");
const cors = require("cors");
const corsOptions = require('./config/corsOption')
const { logger } = require("./middleware/logEvents");
const appRoutes = require("./routes/subdir");
const employeeRoutes = require("./routes/api/employees");
const resgisterRoutes = require("./routes/api/register");
const authRoutes = require("./routes/api/auth");
const refreshRoutes = require("./routes/api/refresh");
const logoutRoute = require("./routes/api/logout");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3500;
const credentials = require("./middleware/credentials");
const { verifyJWT } = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const { connectDB } = require("./config/dbConn");

require("dotenv").config();
const express = require("express");
const app = express();

//connect to MongoDB
connectDB();

//custom middleware logger
app.use(logger);

app.use(credentials);

//cross origin resource sharing
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

//routes
app.use(appRoutes);

app.use("/register", resgisterRoutes);
app.use("/auth", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoute);

app.use(verifyJWT);
app.use("/employees", employeeRoutes);

app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "404.html"));
});

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`server is connected to DB and running on port ${PORT}`);
  });
});
