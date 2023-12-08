![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# Profile API
boo-world server code challenge built with node with expressjs

## Requirement
This app tested using :
* Node >= 16


## Project structure
```markdown
├── database
│   └── mongo.database.js
├── controllers
│   └── profile.controller.js
├── models
│   └── profile.model.js
├── services
│   └── profile.service.route.js
├── routes
│   └── profile.route.js
│   └── web.profile.route.js
├── utils
│   └── response.js
│   └── validation.js
├── views
│   └── partials
│   └── profile_template.ejs
├── package-lock.json
├── package.json
├── .env
├── .gitignore
├── .dockerignore
├── Dockerfile
└── app.js

```

## How to run
### Running Unit Test (with code coverage)
```bash
$npm test
```
* result
```shell
------------------------|---------|----------|---------|---------|--------------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s        
------------------------|---------|----------|---------|---------|--------------------------
All files               |   90.82 |    82.25 |   88.63 |   90.82 |                          
 server                 |     100 |      100 |     100 |     100 |                          
  app.js                |     100 |      100 |     100 |     100 |                          
 server/controllers     |   88.63 |    76.66 |   85.18 |   88.63 |                          
  comment.controller.js |   89.47 |    77.77 |   91.66 |   89.47 | 68,83-89                 
  profile.controller.js |   84.37 |       70 |   77.77 |   84.37 | 24,34-37,55              
  user.controller.js    |   94.44 |      100 |   83.33 |   94.44 | 40                       
 server/database        |   93.75 |       50 |     100 |   93.75 |                          
  mongo.database.js     |   93.75 |       50 |     100 |   93.75 | 36,52                    
 server/models          |     100 |      100 |     100 |     100 |                          
  comment.model.js      |     100 |      100 |     100 |     100 |                          
  profile.model.js      |     100 |      100 |     100 |     100 |                          
  user.model.js         |     100 |      100 |     100 |     100 |                          
 server/routes          |     100 |      100 |     100 |     100 |                          
  comment.route.js      |     100 |      100 |     100 |     100 |                          
  profile.route.js      |     100 |      100 |     100 |     100 |                          
  user.route.js         |     100 |      100 |     100 |     100 |                          
 server/services        |   88.37 |     90.9 |     100 |   88.37 |                          
  comment.service.js    |   90.14 |       90 |     100 |   90.14 | 62-63,78,122-123,147-148 
  profile.service.js    |   85.71 |      100 |     100 |   85.71 | 43-44,55-56              
  user.service.js       |   86.66 |      100 |     100 |   86.66 | 30-31,46-47              
 server/utils           |   83.33 |      100 |   66.66 |   83.33 |                          
  response.js           |   83.33 |      100 |   66.66 |   83.33 | 8-14                     
------------------------|---------|----------|---------|---------|--------------------------

Test Suites: 6 passed, 6 total
Tests:       49 passed, 49 total
Snapshots:   0 total
Time:        2.69 s, estimated 3 s
```


### Run server natively with node
```bash
$node app.js
```

### Run server with NPM
```bash
$npm run start
```

### Run server using docker
This project supported with docker, it's meant that you can run this project using `docker` command


### List of endpoint API

---- PROFILE API ----

* (POST) create user profile
```curl
curl --location --request POST 'http://localhost:3000/profile' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "B Martinez",
    "description": "Adolph Larrue Martinez III.",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL"
}'
```

* (GET) user profile by id (web or json)
below is get user profile (with json return)
```curl 
curl --location --request GET 'http://localhost:3000/profile/<profile_id>' \
--header 'Content-Type: application/json' \
--data-raw ''

```

below is get user profile (with web return)
```curl 
curl --location --request GET 'http://localhost:3000/profile/<profile_id>' \
--header 'Content-Type: text/html' \
--data-raw ''

```
_note: change <profile_id> with saved profile id_

* (GET) all profiles
```curl 
curl --location --request GET 'http://localhost:3000/profiles' \
--header 'Content-Type: application/json' \
--data-raw ''

```

---- USER API ----

* (POST) create user
```curl
curl --location --request POST 'http://localhost:3000/user' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "B Martinez",
}'
```

* (GET) user by id
```curl 
curl --location --request GET 'http://localhost:3000/user/<user_id>' \
--header 'Content-Type: application/json' \
--data-raw ''

```

---- COMMENT API ----

* (POST) send comment
```curl 
curl --location --request POST 'http://localhost:3000/user/comment' \
--header 'Content-Type: application/json' \
--data-raw '{
    "from": 3,
    "to": 2,
    "mbti": null,
    "enneagram": "6w5",
    "zodiac": "Aquarius",
    "title": "test comment",
    "comment": "This is a test comment!"
}'
```
_note: mbti, enneagram and zodiac are optional, if we are not send then put it as null._

* (POST) like or unlike comment
```curl 
curl --location --request POST 'http://localhost:3000/user/<action>/<comment_id>'
```
_note:_ 

_a. change <action> to like or unlike_

_b. change <comment_id> with target comment_id_


* (GET) all comment from user
```curl
curl --location --request GET 'http://localhost:3000/user/comment/from/<from_user_id>'
```
_note:_

_a. change <from_user_id> with user_id ("from" field)_


* (GET) all comment to user (with sort and filter)
```curl
curl --location --request GET 'http://localhost:3000/user/comment/to/<to_user_id>?mbti=true&enneagram=true&zodiac=true&page=1&limit=10&sortby=best'
```

_note:_ 

_a. change <to_user_id> with user_id ("to" field)_  

_b. mbti, enneagram, and zodiac set to true if we want result filtered with personality system_

_c. sortby (recent or best)_

_d. page and limit is for paging_

## Todo
(a). add more test case (check code coverage)

(b). adding swagger API docs
