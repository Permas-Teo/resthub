// Initialize express router
let router = require('express').Router();

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Import contact controller
var contactController = require('./contactController');

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new)
    // .delete(contactController.deleteAll)

router.route('/contacts/:name')
    .get(contactController.view)
    .put(contactController.update)
    .delete(contactController.delete);

// Export API routes
module.exports = router;