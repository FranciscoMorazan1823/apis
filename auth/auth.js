const passport = require("passport");
const UserModel = require("../models/user");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromAuthHeaderAsBearerToken(),
      ]),
    },
    async (token, done) => {
      try {
        const user = await UserModel.findOne(
          { _id: token.user._id },
          "-password"
        );
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

async function start() {
  try {
    //Database Connect
    await mongoose.connect(
      process.env.DB_CONNECTION,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log("Database Connected");
      }
    );

    app.listen(3000, () => {
      console.log("Server is running on port 3000 ...");
    });
  } catch (error) {
    console.error(error);
  }
}