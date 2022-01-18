const GoogleStrategy = require('passport-google-oauth2').Strategy;
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const router = require('express').Router();
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '502089662011-l56makj6fl36dnrbaomcf4tu7s2qtf72.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:8800/auth/google/callback',
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// /api/auth/google/success
router.get(
  '/success',
  asyncHandler(async (req, res) => {
    console.log(req.profile);
    // const exsistUser = await User.findOne({})
  })
);
