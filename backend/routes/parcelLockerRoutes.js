var express = require('express');
var router = express.Router();
var parcelLockerController = require('../controllers/parcelLockerController.js');
const cors = require("cors");
var allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const corsSettings = cors({
    credentials: true,
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy does not allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
});

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

/*
 * GET
 */
router.get('/all', corsSettings, parcelLockerController.list);
router.get('/my-parcel-lockers/:username', corsSettings, parcelLockerController.myParcelLockers);
router.get('/my-parcel-lockers/:id', corsSettings, parcelLockerController.getMyParcelLockers); //active
/*
 * GET
 */
router.get('/:id', corsSettings, parcelLockerController.show);

// Add a new GET route for /api/parcels
router.get('/api/parcels', corsSettings, parcelLockerController.getAllParcels);

/*
 * POST
 */
router.post('/', corsSettings, parcelLockerController.create, function (req, res) {
    console.log("Create route called");
});

/*
 * PUT
 */

// Add a new route for editing a parcel locker
router.put('/edit-parcel-locker/:id', corsSettings, parcelLockerController.update);
router.put('/:id', corsSettings, parcelLockerController.update);

/*
 * DELETE
 */
router.delete('/:id', corsSettings, parcelLockerController.remove);


module.exports = router;