![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

# Profile API
boo-world server code challenge built with node with expressjs


## Project structure
```markdown
├── config
├── database
│   └── mongo.database.js
├── controllers
│   └── profile.controller.js
├── models
│   └── profile.model.js
├── services
│   └── profile.service.route.js
├── routes
│   └── profile.api.route.js
│   └── profile.dashboard.route.js
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
### Running Unit Test
```bash
$npm test
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
* (POST) create user profile
```curl
curl --location --request POST 'http://localhost:3000/api/user/profile' \
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

* (GET) user profile by id
```curl 
curl --location --request GET 'http://localhost:3000/api/user/profile/<profile_id>' \
--data-raw ''

```
_note: change <profile_id> with saved profile id_

* (POST) send comment
```curl 
curl --location --request POST 'http://localhost:3000/api/user/activity/comment' \
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
curl --location --request POST 'http://localhost:3000/api/user/activity/<action>/<comment_id>'
```
_note:_ 

_a. change <action> to like or unlike_

_b. change <comment_id> with target comment_id_

* (GET) comment to profile id (with sort and filter)
```curl
curl --location --request GET 'http://localhost:3000/api/user/activity/comment/to/<to_profile_id>?mbti=true&enneagram=true&zodiac=true&page=1&limit=10&sortby=best'
```

_note:_ 

_a. change <to_profile_id> with profile_id_ 

_b. mbti, enneagram, and zodiac set to true if we want result filtered with personality system_

_c. sortby (recent or best)_

_d. page and limit is for paging_


* user profile page (web)

```http request
http://localhost:3000/dashboard/profile/<profile_id>
```

_note : change <profile_id> with user profile id_

See postman folder for postman collection file.

## Todo
