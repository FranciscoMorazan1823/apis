var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");

var userRouter = require("./routers/user");
var authRouter = require("./routers/auth");
var wordRouter = require("./routers/word");
var passport = require("passport");

var errorHandler = require("./utils/errorsHandler");



require("./database/config");
require("./auth/auth");
var app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(authRouter);

app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use("/users", userRouter);
app.use("/words", wordRouter);
app.use(errorHandler);
module.exports = app;