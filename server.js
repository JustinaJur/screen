// var express = require("express");
// var app = express();
// app.use(express.static(__dirname + "/"));
// app.listen(process.env.PORT || 8080);

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 4000;

server.use(middlewares);
server.use(router);

server.listen(port);
