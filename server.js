import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";
import { Server } from "socket.io";

const app = express();

//? http server
const server = createServer(app);
const dirName = dirname(fileURLToPath(import.meta.url));
const io = new Server(server, {
  connectionStateRecovery: {},
});

//! ==> / is a rout handler
//* initialize app to be a function handler - we supply this app to http server
app.get("/", (req, res) => {
  res.sendFile(join(dirName, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

//* 3000 is port
//! this is http server
server.listen(3000, () => {
  console.log("server running");
});
