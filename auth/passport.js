const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        console.log(password);
        try {
          const user = await User.findOne({ email }).select('password');

          if (!user)
            return done(null, false, {
              message: 'That email is not registered',
            });

          const isMatched = await user.matchPassword(password);

          if (!isMatched) {
            return done(null, false, {
              message: 'Password is incorrect',
            });
          }

          return done(null, user);
        } catch (error) {
          consol.log(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
