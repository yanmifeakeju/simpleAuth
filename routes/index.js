const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const router = express.Router();

/* GET home page. */
router.route('/').get((req, res, next) => {
  res.render('index', { title: 'SimpleAuth' });
});

router.route('/home').get(ensureAuthenticated, (req, res, next) => {
  res.render('home', { title: 'Home | SimpleAuth', name: req.user.name });
});

module.exports = router;
