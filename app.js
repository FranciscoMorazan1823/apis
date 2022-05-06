var passport = require("passport");
passport.authenticate("jwt", { session: false });
require("./auth/auth");
var express = require("express");
require("./database/config");
var wordRouter = require("./routers/word");
var passport = require("passport");
require("./auth/auth");
app.use(authRouter);
var userRouter = require("./routers/user");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var helmet = require("helmet");

var app = express();

app.use("/users", passport.authenticate("jwt", { session: false }), userRouter);
app.use(passport.authenticate("jwt", { session: false }))
app.use("/users", userRouter);
app.use("/words", wordRouter);
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", userRouter);
app.use("/words", wordRouter);
app.use(authRouter);

module.exports = app;