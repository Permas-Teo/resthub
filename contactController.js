// Import contact model
Contact = require('./contactModel');

// Handle index actions
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: contacts
        });
    });
};

// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // save the contact and check for errors
    contact.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New contact created!',
                data: contact
            });
    });
};

// Handle view contact info
exports.view = function (req, res) {
    Contact.find({ 'name': req.params.name }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact[0] // 1 item
        });
    });
};


// Handle update contact info
exports.update = function (req, res) {
    const update = {
        name: req.params.name,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone
    }
    Contact.findOneAndUpdate({ 'name': req.params.name }, update, {returnOriginal: false, upsert:true, rawResult: true}, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact Info Put',
            data: contact
        });
    });
};

// Handle delete all contacts
exports.deleteAll = function (req, res) {
    Contact.remove(function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'All Contacts deleted'
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        name: req.params.name
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};