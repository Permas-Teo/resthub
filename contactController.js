// Import contact model
Contact = require('./contactModel');

// Handle index actions, get all
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

// Handle create contact actions, post
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
            res.json({
                status: "error",
                message: err
            });
        else
            res.json({
                status: "success",
                message: 'New contact created!',
                data: contact
            });
    });
};

// Handle view contact info, get
exports.view = function (req, res) {
    Contact.find({ 'name': req.params.name }, function (err, contact) {
        if (contact.length == 0) // no items found
            res.status(404).json({
                message: 'Contact not found'
            });
        else {
            res.status(200).json({
                message: 'Contact details loading..',
                data: contact[0] // 1 item
            });
        }
    });
};

// Handle view contact info, get
// exports.view = function (req, res) {
//     try {
//         Contact.find({ 'name': req.params.name }, function (err, contact) {
//             res.json({
//                 status: "success",
//                 message: 'Contact details loading..',
//                 data: contact // 1 item
//             });
//         });
//     } catch {
//         res.json({
//             status: "error",
//             message: err
//         });
//     }
// };


// Handle update contact info, put
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