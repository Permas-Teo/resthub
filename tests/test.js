const TEST_PORT = 8081;
const POST_MESSAGE_SUCCESS = "New contact created!";
const GET_MESSAGE_SUCCESS = "Contact details loading..";
const GET_ALL_MESSAGE_SUCCESS = "Contacts retrieved successfully";
const PUT_MESSAGE_SUCCESS = "Contact Info Put";
const DELETE_MESSAGE_SUCCESS = "Contact deleted";

process.env.PORT = TEST_PORT; 

// Import the dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

var test1_contact = {  
    name: "test1",
    gender: "male",
    email: "test1@gmail.com",
    phone: "123"
}; 

var test1_contact_updated = {  
    name: "test1",
    gender: "female",
    email: "test1@gmail.com",
    phone: "123456"
}; 

// var test2_contact = {  
//     name: "test2",
//     gender: "male",
//     email: "test2@gmail.com",
//     phone: "456"
// }; 

describe("Contacts POST", () => {
    describe("POST /", () => {
        it("should post a single contact record", (done) => {
            chai.request(app)
                .post(`/api/contacts`)
                .send(test1_contact)
                .end((err, res) => {
                    res.should.have.status(200); 
                    res.body.message.should.equal(POST_MESSAGE_SUCCESS);
                    res.body.data.name.should.equal(test1_contact["name"]);
                    res.body.data.gender.should.equal(test1_contact["gender"]);
                    res.body.data.email.should.equal(test1_contact["email"]);
                    res.body.data.phone.should.equal(test1_contact["phone"]);
                    done();
                });
        });
    });
});

describe("Contacts", () => {
    describe("GET /", () => {
        it("should get all contacts record", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal(GET_ALL_MESSAGE_SUCCESS);
                    res.body.data.should.be.a('array');
                 done();
                });
        });       
            
        // Test to get single contact record
        it("should get a single contact record", (done) => {
            const name = test1_contact["name"];
            chai.request(app)
                .get(`/api/contacts/${name}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal(GET_MESSAGE_SUCCESS);
                    res.body.data.name.should.equal(test1_contact["name"]);
                    res.body.data.gender.should.equal(test1_contact["gender"]);
                    res.body.data.email.should.equal(test1_contact["email"]);
                    res.body.data.phone.should.equal(test1_contact["phone"]);   
                    done();
                });
        });
    });
});

// describe("Contacts", () => {
//     describe("PUT /", () => {
//         it("should update test1 contact record", (done) => {
//             const name = test1_contact_updated["name"];
//             chai.request(app)
//                 .put(`/api/contacts/${name}`)
//                 .end((err, res) => {
//                     res.should.have.status(200);
//                     res.body.message.should.equal(PUT_MESSAGE_SUCCESS);
//                     res.body.data.should.be.a('object');
//                     res.body.data.value.should.be.a('object');

//                     res.body.data.value.name.should.equal(test1_contact["name"]);
//                     console.log(res.body.data);
//                     // res.body.data.value.gender.should.equal(test1_contact_updated["gender"]);
//                     // res.body.data.value.email.should.equal(test1_contact_updated["email"]);
//                     // res.body.data.value.phone.should.equal(test1_contact_updated["phone"]);  
//                     done();
//                 });
//         });       
//     });
// });

describe("Contacts", () => {
    describe("DELETE /", () => {
        it("should delete contact record", (done) => {
            chai.request(app)
                .delete('/api/contacts/test1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal(DELETE_MESSAGE_SUCCESS);
                    done();
                });
        });       
    });
});

