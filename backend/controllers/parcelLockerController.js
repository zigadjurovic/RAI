const ParcelLockerModel = require('../models/parcelLockerModel.js');

module.exports = {
  list: function(req, res) {
    ParcelLockerModel.find({}, 'numberParcelLocker name owner others', function(err, parcelLockers) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcelLockers.',
          error: err
        });
      }
  
      return res.json(parcelLockers);
    });
  },
  

  myParcelLockers: function (req, res) {
    var username = req.params.username; // Get the username from the request parameters
  
    ParcelLockerModel.find({ $or: [{ owner: username }, { others: username }] }, 'numberParcelLocker name', function(err, parcelLockers) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcelLockers.',
          error: err
        });
      }
  
      return res.json(parcelLockers);
    });
  },
  
  
  

  myParcelLockersApi: function(req, res) {
    var id = req.params.id;

    ParcelLockerModel.find({ owner: id }, 'numberParcelLocker name', function(err, parcelLockers) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcelLockers.',
          error: err
        });
      }

      return res.json(parcelLockers);
    });
  },

  show: function(req, res) {
    var id = req.params.id;

    ParcelLockerModel.findOne({ _id: id }, 'numberParcelLocker name', function(err, parcelLocker) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcelLocker.',
          error: err
        });
      }

      if (!parcelLocker) {
        return res.status(404).json({
          message: 'No such parcelLocker'
        });
      }

      return res.json(parcelLocker);
    });
  },

  create: function (req, res) {
    console.log('Create function called');
    console.log(req.session);

    var parcelLocker = new ParcelLockerModel({
      numberParcelLocker: req.body.numberParcelLocker,
      name: req.body.nameParcelLocker,
      userId: req.session.userId,
      owner: req.body.owner,
      others: req.body.others
    });

    console.log('Request Payload:', req.body);
    console.log('Session User ID:', req.session.userId);

    parcelLocker.save(function (err, parcelLocker) {
      if (err) {
        console.error('Error when creating parcelLocker:', err);

        return res.status(500).json({
          message: 'Error when creating parcelLocker',
          error: err
        });
      }

      return res.status(201).json(parcelLocker);
    });
  },
    

  getMyParcelLockers: function (req, res) {
    var id = req.params.id;
  
    ParcelLockerModel.find({ userId: id }, 'numberParcelLocker name', function (err, parcelLockers) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcelLockers.',
          error: err
        });
      }
  
      return res.json(parcelLockers);
    });
  },
  

  getMyParcelsByUserId: function(req, res) {
    var id = req.params.id;
  
    ParcelLockerModel.find({ userId: id }, 'numberParcelLocker name', function(err, parcels) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcels.',
          error: err
        });
      }
  
      return res.json(parcels);
    });
  },
  

  update: function(req, res) {
    var id = req.params.id;
  
    ParcelLockerModel.findOne({ _id: id }, 'numberParcelLocker name', function(err, parcelLocker) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcelLocker',
          error: err
        });
      }
  
      if (!parcelLocker) {
        return res.status(404).json({
          message: 'No such parcelLocker'
        });
      }
  
      parcelLocker.numberParcelLocker = req.body.numberParcelLocker || parcelLocker.numberParcelLocker;
      parcelLocker.name = req.body.name || parcelLocker.name;
  
      parcelLocker.save(function(err, parcelLocker) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating parcelLocker.',
            error: err
          });
        }
  
        return res.json(parcelLocker);
      });
    });
  },  

  remove: function(req, res) {
    var id = req.params.id;

    ParcelLockerModel.findByIdAndRemove(id, function(err, parcelLocker) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the parcelLocker.',
          error: err
        });
      }

      return res.status(204).json();
    });
  },

  getAllParcels: function (req, res) {
    ParcelLockerModel.find({}, 'numberParcelLocker name', function (err, parcels) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting parcels.',
          error: err
        });
      }

      return res.json(parcels);
    });
  }
};