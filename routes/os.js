const express = require('express');
const os = require('os');
var router = express.Router();
router.get('/', function(req, res, next) {
    const osInfo ={
        platform: os.platform(),
        type :os.type(),
        hostname: os.hostname(),
      
        cpus: os.cpus(),
    }

    res.json(osInfo);
    console.log(osInfo);
});

router.get('/cpus', function(req, res, next) {
    const osInfo ={
        cpus: os.cpus(),
    }
    res.json(osInfo)   ;
    console.log(osInfo);
});

router.get('/cpus/:id', function(req, res, next) {
    const osInfo ={
        cpus: os.cpus()[req.params.id],
    }
    res.json(osInfo)   ;
    console.log(osInfo);
});

module.exports = router;