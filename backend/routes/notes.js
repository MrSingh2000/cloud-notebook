var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.send('Here are your notes');
});


module.exports = router;