const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Add vegeshop //deploy //documentation

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));

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

app.options("*", cors());
app.options("/sessions/:id", cors());
app.options("/sessions_user/:id", cors());
app.options("/sessions_logged/:id", cors());
app.options("/sessions_contacted/:id", cors());
app.options("/sessions_pages/:id", cors());
app.options("/sessions_cartItems/:id", cors());
app.options("/sessions_buyedItems/:id", cors());
app.options("/sessions_scrap/:id", cors());

app.options("/users", cors());
app.options("/users/:id", cors());
app.options("/users_average", cors());
app.options("/users_average/:id", cors());

const sessionController = require('./controllers/session.controller');
app.post("/sessions", cors(), sessionController.insertSession);
app.get("/sessions", cors(), sessionController.getAllSessions);
app.get("/sessions/:id", cors(), sessionController.getSingleSession);
app.get("/sessions_user/:id", cors(), sessionController.getAllUsersSessions);
app.patch("/sessions/:id", sessionController.updateSession);
app.patch("/sessions_logged/:id", cors(), sessionController.updateSessionLogged);
app.patch("/sessions_contacted/:id", cors(), sessionController.updateSessionContacted);
app.put("/sessions_pages/:id", cors(), sessionController.addSessionPages);
app.put("/sessions_cartItems/:id", cors(), sessionController.addSessionCartItems);
app.put("/sessions_buyedItems/:id", cors(), sessionController.addSessionBuyedItem);
app.put("/sessions_scrap/:id", cors(), sessionController.addSessionScrap);
app.delete("/sessions/:id", cors(), sessionController.deleteSession);
app.delete("/sessions", sessionController.deleteAllSessions);

const usersController = require('./controllers/user.controller');
app.get("/users", cors(), usersController.getAllUsers);
app.get("/users/:id", cors(), usersController.getUser);
app.get("/users_average", cors(), usersController.getAllAverage);
app.get("/users_average/:id", cors(), usersController.getUserAverage); //check

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
    console.log(`Server is running on port ${port}.`)
);

server.timeout = 0;
