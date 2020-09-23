const TEST_PORT = 8081;
const MESSAGES = require('../messages');

process.env.PORT = TEST_PORT; 

// Import the dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');

// Configure chai
chai.use(chaiHttp);
chai.should();

// Known test data
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

var test2_contact = {  
    name: "test2",
    gender: "male",
    email: "test2@gmail.com",
    phone: "456"
}; 

// POST tests
describe("Contacts POST", () => {
    describe("POST /", () => {
        it("should post a single contact record", (done) => {
            chai.request(app)
                .post(`/api/contacts`)
                .send(test1_contact)
                .end((err, res) => {
                    res.should.have.status(200); 
                    res.body.message.should.equal(MESSAGES["POST_MESSAGE_SUCCESS"]);
                    res.body.data.name.should.equal(test1_contact["name"]);
                    res.body.data.gender.should.equal(test1_contact["gender"]);
                    res.body.data.email.should.equal(test1_contact["email"]);
                    res.body.data.phone.should.equal(test1_contact["phone"]);
                    done();
                });
        });
    });
});

// GET tests
describe("Contacts", () => {
    describe("GET /", () => {
        it("should get all contacts record", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal(MESSAGES["GET_ALL_MESSAGE_SUCCESS"]);
                    res.body.data.should.be.a('array');
                 done();
                });
        });       
            
        it("should get a single contact record", (done) => {
            const name = test1_contact["name"];
            chai.request(app)
                .get(`/api/contacts/${name}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal(MESSAGES["GET_MESSAGE_SUCCESS"]);
                    
                    res.body.data.name.should.equal(test1_contact["name"]);
                    res.body.data.gender.should.equal(test1_contact["gender"]);
                    res.body.data.email.should.equal(test1_contact["email"]);
                    res.body.data.phone.should.equal(test1_contact["phone"]);   
                    done();
                });
        });

        it("should get a 404 error for nonexistent contact record", (done) => {
            const name = test2_contact["name"];
            chai.request(app)
                .get(`/api/contacts/${name}`)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.message.should.equal(MESSAGES["GET_MESSAGE_FAILURE"]);
                    done();
                });
        });
    });
});

// PUT tests
describe("Contacts", () => {
    describe("PUT /", () => {
        it("should update test1 contact record", (done) => {
            const name = test1_contact_updated["name"];
            chai.request(app)
                .put(`/api/contacts/${name}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.message.should.equal(MESSAGES["PUT_MESSAGE_UPDATED_SUCCESS"]);

                    res.body.data.should.be.a('object');
                    res.body.data.value.should.be.a('object');
                    res.body.data.value.name.should.equal(test1_contact["name"]);
                    done();
                });
        });       
    });

    describe("PUT /", () => {
        it("should create test2 contact record", (done) => {
            const name = test2_contact["name"];
            chai.request(app)
                .put(`/api/contacts/${name}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.message.should.equal(MESSAGES["PUT_MESSAGE_CREATED_SUCCESS"]);

                    res.body.data.should.be.a('object');
                    res.body.data.value.should.be.a('object');
                    res.body.data.value.name.should.equal(test2_contact["name"]);
                    done();
                });
        });       
    });
});

// DELETE tests
describe("Contacts", () => {
    describe("DELETE /", () => {
        it("should delete contact record", (done) => {
            const name = test1_contact["name"];
            chai.request(app)
                .delete(`/api/contacts/${name}`)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });   

        it("should delete contact record", (done) => {
            const name = test2_contact["name"];
            chai.request(app)
                .delete(`/api/contacts/${name}`)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });   
        
        it("should get a 404 error for nonexistent contact record", (done) => {
            chai.request(app)
                .delete('/api/contacts/test1')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.message.should.equal(MESSAGES["DELETE_MESSAGE_FAIL"]);
                    done();
                });
        });   
    });
});

