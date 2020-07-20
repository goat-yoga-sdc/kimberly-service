const router = require('express').Router();
const controller = require('./controller.js');

router
.route('/suggested')
.get(controller.getAll)

router
.route('/shades/:id')
.get(controller.getShades);

router
.route('/quickview')
.get(controller.getQuickview);

module.exports = router;