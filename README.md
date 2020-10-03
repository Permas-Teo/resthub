# resthub
CS3219 assignment B1, B2

## Run the API locally (B1)

Run mongodb with 

mongod

On a separate terminal, go to root repository and run:

npm start

## Access deployed API via Postman (B1)

Name serves as the primary key, all contact objects will be identified by name, represented with {contact name} through the api. 

GET all contact: http://localhost:8080/api/contacts

GET single contact: http://localhost:8080/api/contacts/{contact name}

POST  contact: http://localhost:8080/api/contacts

Sample Body fields:

"name": "test_name",
"gender": "male",
"email": "test_name@gmail.com",
"phone": "123"

PUT contact: http://localhost:8080/api/contacts/{contact name}

New contact created if {contact name} does not exist, otherwise update fields of contact with name = {contact name}. **Note: name field cannot be updated through PUT**

DELETE contact: http://localhost:8080/api/contacts/{contact name}

Contact deleted if found

## Run tests locally (B2)

npm test


## Run tests on Travis (B2)

Travis CI build  is set up to run test automatically on code push to any branch of resthub. It can be accessed at https://travis-ci.org/github/Permas-Teo/resthub



