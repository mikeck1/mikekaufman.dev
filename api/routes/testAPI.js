var express = require('express');
var router = express.Router();
// http://localhost:9000/testAPI/greeting
router.get('/', function (req, res, next) {
    res.send("API is working properly");
});

// http://localhost:9000/testAPI/greeting?name=Mike
router.get('/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

module.exports = router;