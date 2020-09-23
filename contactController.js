Contact = require('./contactModel');
const MESSAGES = require('./messages');

// Get all
exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err)
            res.send(err);
        res.status(200).json({
            message: MESSAGES["GET_ALL_MESSAGE_SUCCESS"],
            data: contacts
        });
    });
};

// Get one
exports.view = function (req, res) {
    Contact.find({ 'name': req.params.name }, function (err, contact) {
        if (err)
            res.send(err);
        if (contact.length == 0) // no items found
            res.status(404).json({
                message: MESSAGES["GET_MESSAGE_FAILURE"]
            });
        else {
            res.status(200).json({
                message: MESSAGES["GET_MESSAGE_SUCCESS"],
                data: contact[0] // 1 item
            });
        }
    });
};

// Post
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.save(function (err) {
        if (err)
            res.send(err);
        res.status(200).json({
            message: MESSAGES["POST_MESSAGE_SUCCESS"],
            data: contact
        });
    });
};

// Put
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

        if (contact["lastErrorObject"]["updatedExisting"] == true) {
            res.status(200).json({
                message: MESSAGES["PUT_MESSAGE_UPDATED_SUCCESS"],
                data: contact
            });
        } else {
            res.status(201).json({
                message: MESSAGES["PUT_MESSAGE_CREATED_SUCCESS"],
                data: contact
            });
        }
    });
};

// // Delete all
// exports.deleteAll = function (req, res) {
//     Contact.remove(function (err, contact) {
//         if (err)
//             res.send(err);
//         res.json({
//             status: "success",
//             message: 'All Contacts deleted'
//         });
//     });
// };

// Delete one
exports.delete = function (req, res) {
    Contact.findOneAndRemove({
        name: req.params.name
    }, {rawResult: true}, function (err, contact) {
        if (err)
            res.send(err);
        if (contact["value"] == undefined) { // no items found
            res.status(404).json({
                message: MESSAGES["DELETE_MESSAGE_FAIL"],
                data: contact
            })
        } else {
            res.status(204).json({
                data: contact
            });
        }
    });
};
