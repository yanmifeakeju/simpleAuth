const passport = require('passport');

exports.getlogin = async (req, res, next) => {
  res.render('login', { title: 'Login | SimpleAuth' });
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/auth/login',
    failureFlash: true,
  })(req, res, next);
};
exports.logout = async (req, res, next) => {
  req.logout();
  req.flash('messages', `You're logged out`);
  res.redirect('/auth/login');
};
