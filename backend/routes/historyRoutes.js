var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var historyController = require('../controllers/historyController.js');

function requiresLogin(req, res, next){
    if(req.session && req.session.userId){
        return next();
    } else{
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}

router.get('/history/', historyController.getAll);
router.get('/history/:id', historyController.get);
router.post('/history/', upload.none(), historyController.add);

module.exports = router;