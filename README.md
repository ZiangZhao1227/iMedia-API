# iMedia-API
A social media REST API with jwt login, register, and all CRUD operations


## Tech & libraries

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [JWT](https://jwt.io/)
- [Morgan](https://www.npmjs.com/package/morgan)
- Moment-timezone
- bcrypt
- helmet
- dotenv
- multer
- cors

## Server is deployed on Heroku

> BASE URL
> https://imedia-app.herokuapp.com/

## URL Lists
#### User
* GET https://imedia-app.herokuapp.com/api/users/
* GET https://imedia-app.herokuapp.com/api/friends/:userId
* PUT https://imedia-app.herokuapp.com/api/users/:id
* DELETE https://imedia-app.herokuapp.com/api/users/:id
* PUT https://imedia-app.herokuapp.com/api/users/:id/follow
* PUT https://imedia-app.herokuapp.com/api/users/:id/unfollow

#### POST
* GET https://imedia-app.herokuapp.com/api/posts/:id
* GET https://imedia-app.herokuapp.com/api/posts/profile/:username
* GET https://imedia-app.herokuapp.com/api/posts/timeline/:userId
* PUT https://imedia-app.herokuapp.com/api/posts/:id/like
* PUT https://imedia-app.herokuapp.com/api/posts/:id
* DELETE https://imedia-app.herokuapp.com/api/posts/:id
* POST https://imedia-app.herokuapp.com/api/posts

#### Authentication
* POST https://imedia-app.herokuapp.com/api/auth/login
* POST https://imedia-app.herokuapp.com/api/auth/register


#### Authentication
* POST https://imedia-app.herokuapp.com/api/upload/

## Installing

Execute the command from the project directory

```
 npm install
```

## Env Variables

Make Sure to Create a .env file and add appropriate variables in order to use the app.

```
JWT_SEC_KEY = YOUR KEY HERE
MONGODB_URI = YOUR KEY HERE
MONGODB_URI_LOCAL = YOUR KEY HERE
```

## REST API Architecture --- MVC

![MVC](https://user-images.githubusercontent.com/56063269/160848070-85fa0c23-3173-4ac5-8c0c-d7e89b5b1a23.jpeg)
