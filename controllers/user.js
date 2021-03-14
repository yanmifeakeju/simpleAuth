const { validationResult } = require('express-validator');

const multer = require('multer');
const upload = multer({ dest: './public/uploads' });

const User = require('../models/User');

exports.getRegister = async (req, res, next) => {
  res.render('register', { title: 'Register | SimpleAuth' });
};

exports.register = async (req, res, next) => {
  let result = validationResult(req);
  // console.log(result);
  if (!result.isEmpty()) {
    result = result.array();
    let errors = {};

    result.forEach((error) => {
      errors[error.param] = error.msg;
    });

    req.session.errors = errors;

    return res.render('register', {
      title: 'test',
      fields: req.body,
    });
  }

  try {
    const { name, username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      req.session.messages = `${email} is already in use`;
      return res.render('register', {
        title: 'test',
        fields: req.body,
      });
    }

    await User.create({ name, email, username, password });

    req.flash(
      'messages',
      'You account has been create successfully. Please log in'
    );

    res.redirect('/auth/login');
  } catch (error) {
    console.log(error.name);
    // console.log(error.value);
    console.log(error);
  }
};
