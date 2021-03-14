const { body } = require('express-validator');

module.exports = {
  requireName: body('name').not().isEmpty().withMessage('Name is required'),
  requireUsername: body('username')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username cannot be less than 5 characters'),
  requireEmail: body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  requirePassword: body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password cannot be less than 6 characters'),
  loginEmail: body('email').isEmail(),
  loginPassword: body('email').exists().isLength({ min: 6 }),
};
