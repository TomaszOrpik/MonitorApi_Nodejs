const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// const corsOptions = {
//     origin: "http://localhost:4200", //??? for angular
//     originStatus: 200
// }
//Add vegeshop //deploy //documentation

const app = express();
//app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
//     // Website you wish to allow to connect
//     // res.setHeader('Access-Control-Allow-Origin', 'https://vegeshop-714fb.web.app/');

//     // // Request methods you wish to allow
//     // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // // Request headers you wish to allow
//     // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // // Set to true if you need the website to include cookies in the requests sent
//     // // to the API (e.g. in case you use sessions)
//     // res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

app.options("/sessions", cors());

const db = require('./models');
db.mongoose
.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    socketTimeoutMS: 0,
    connectionTimeout: 0
})
.then(() => {
    console.log("Connected to database!");
})
.catch(err => {
    console.log("Cannot connect to database", err);
    process.exit();
})

const sessionController = require('./controllers/session.controller');
app.post("/sessions", cors(), sessionController.insertSession);
app.get("/sessions", sessionController.getAllSessions);
app.get("/sessions/:id", sessionController.getSingleSession);
app.get("/sessions_user/:id", sessionController.getAllUsersSessions);
app.patch("/sessions/:id", sessionController.updateSession);
app.patch("/sessions_logged/:id", sessionController.updateSessionLogged);
app.patch("/sessions_contacted/:id", sessionController.updateSessionContacted);
app.put("/sessions_pages/:id", sessionController.addSessionPages);
app.put("/sessions_cartItems/:id", sessionController.addSessionCartItems);
app.put("/sessions_buyedItems/:id", sessionController.addSessionBuyedItem);
app.put("/sessions_scrap/:id", sessionController.addSessionScrap);
app.delete("/sessions/:id", sessionController.deleteSession);
app.delete("/sessions", sessionController.deleteAllSessions);

const usersController = require('./controllers/user.controller');
app.get("/users", usersController.getAllUsers);
app.get("/users/:id", usersController.getUser);
app.get("/users_average", usersController.getAllAverage);
app.get("/users_average/:id", usersController.getUserAverage);

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
    console.log(`Server is running on port ${port}.`)
);

server.timeout = 0;
