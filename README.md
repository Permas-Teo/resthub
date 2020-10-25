# resthub

## Run the API locally (B1)

Run mongodb with 

mongod

On a separate terminal, go to root repository and run:

npm start

## Access deployed API via Postman (B1)

Name serves as the primary key, all contact objects will be identified by name, represented with {contact_name} through the api. 

__GET all contact__: http://localhost:8080/api/contacts

__GET single contact__: http://localhost:8080/api/contacts/{contact_name}

__POST  contact__: http://localhost:8080/api/contacts

Sample Body fields:

"name": "test_name",
"gender": "male",
"email": "test_name@gmail.com",
"phone": "123"

__PUT contact__: http://localhost:8080/api/contacts/{contact_name}

Sample Body fields:

"gender": "male",
"email": "test_name@hotmail.com",
"phone": "456"

New contact created if {contact_name} does not exist, otherwise update fields of contact with name = {contact_name}. **Note: name field cannot be updated through PUT**

__DELETE contact__: http://localhost:8080/api/contacts/{contact_name}

Contact deleted if found

## Run tests locally (B2)

npm test


## Run tests on Travis (B2)

Travis CI build  is set up to run test automatically on code push/PR to any branch of resthub. It can be accessed at https://travis-ci.org/github/Permas-Teo/resthub

## Demonstrate ability to automatically deploy tool to AWS via Travis (B3)

Travis CI build  is set up to deploy to AWS automatically on code push/PR to any branch of resthub. It can be accessed at https://travis-ci.org/github/Permas-Teo/resthub



