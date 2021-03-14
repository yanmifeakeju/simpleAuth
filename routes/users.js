const express = require('express');
const { register, getRegister } = require('../controllers/user');
const {
  requireName,
  requireEmail,
  requireUsername,
  requirePassword,
} = require('../middleware/validation');
const router = express.Router();

/* GET users listing. */
router
  .route('/register')
  .get(getRegister)
  .post(requireName, requireEmail, requireUsername, requirePassword, register);

module.exports = router;
