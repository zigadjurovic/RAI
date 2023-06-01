var express = require('express');
var router = express.Router();
const parcelLockerController = require('../controllers/parcelLockerController.js');
var UserModel = require('../models/userModel.js');

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error("You must be logged in to view this page");
    err.status = 401;
    return next(err);
  }
}

async function isAdmin(req, res, next) {
  const user = await UserModel.findById(req.session.userId);

  if (user.isAdmin == false) {
    var err = new Error("You must be admin to view this page!");
    err.status = 401;
    return next(err);
  }

  return next();
}

router.get('/', requiresLogin, isAdmin, parcelLockerController.list);

router.put('/:id', requiresLogin, isAdmin, parcelLockerController.update);

router.delete('/delete/:id', requiresLogin, isAdmin, parcelLockerController.remove);

module.exports = router;
