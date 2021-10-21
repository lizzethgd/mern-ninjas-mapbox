const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

//get a list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    Ninja.find({}).then(function(ninjas){
        res.send(ninjas)
    }).catch(next)
}) 

router.get('/ninjas/near', function(req, res, next){
    Ninja.aggregate()
       .near({
        near:
            {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)] 
            }, 
        maxDistance: parseInt(req.query.rad)*1000, 
        spherical: true, 
        distanceField: "dis" 
        })
        .then(function(ninjas){
                res.send(ninjas);})
        .catch(next);
});

router.get('/ninjas/:id', function(req, res, next){       
    Ninja.findById({_id: req.params.id}).then(function(ninja){
            res.send(ninja)
        })
    .catch(next)
}); 

// add a new ninja to the db
router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body)
    .then(function(ninja){
        res.send(ninja)
    }).catch(next)
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Ninja.findById({_id: req.params.id}).then(function(ninja){
            res.send(ninja)
        })
    }).catch(next)
});

// delete a ninja from the db
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja)
    }).catch(next)
});

module.exports = router;


