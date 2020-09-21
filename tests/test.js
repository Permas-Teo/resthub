const TEST_PORT = 8081;

process.env.PORT = TEST_PORT; 

// Import the dependencies for testing
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let should = chai.should();

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Contacts", () => {
    describe("GET /", () => {
        // Test to get all contacts record
        it("should get all contacts record", (done) => {
            chai.request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });       
            
        // // Test to get single contact record
        // it("should get a single contact record", (done) => {
        //     const id = "5f6872a3333099451523955b";
        //     chai.request(app)
        //         .get(`/api/contacts/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             // res.body.length.should.be.eql(1);
        //             done();
        //         });
        // });

        // // Test to get single contact record
        // it("should get a single contact record", (done) => {
        //     const id = "5f6872a3333099451";
        //     chai.request(app)
        //         .get(`/api/contacts/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             done();
        //         });
        // });
    });

    // describe("POST /", () => {
    //     // Test to post single contact record
    //     it("should post a single contact record", (done) => {
    //         var contact = {  
    //             id: "11111111",
    //             name: "test1",
    //             gender: "male",
    //             email: "test1@gmail.com",
    //             phone: "123",
    //         }; 

    //         chai.request(app)
    //             .post(`/api/contacts/${id}`)
    //             .end((err, res) => {
    //                 res.should.have.status(200);
    //                 res.body.should.be.a('object');
    //                 done();
    //             });
    //     });
    // }

});