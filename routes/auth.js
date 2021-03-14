const { Router } = require('express');
const { getlogin, login, logout } = require('../controllers/auth');

const router = Router();

router.route('/login').get(getlogin).post(login);
router.route('/logout').post(logout);

module.exports = router;
