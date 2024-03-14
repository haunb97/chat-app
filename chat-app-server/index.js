import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let users = [];

io.on("connection", (socket) => {
  // chat
  socket.on("chat", (message) => {
    io.sockets.emit("chat", { userName: socket.userName, message: message });
  });

  socket.on("register-user", (userName) => {
    if (users.indexOf(userName) >= 0) {
      //failed
      socket.emit("register-error");
    } else {
      // success
      users.push(userName);
      socket.userName = userName;
      socket.emit("register-success", userName);
      io.sockets.emit("users", users);
    }
  });

  socket.on("logout-user", (userName) => {
    if (userName) {
      users.splice(users.indexOf(socket.userName), 1);
      socket.broadcast.emit("users", users);
    }
  });

  socket.on("disconnect", () => {
    if (socket.userName) {
      users.splice(users.indexOf(socket.userName), 1);
      socket.broadcast.emit("users", users);
    }
  });

  socket.on("typing", () => {
    io.sockets.emit("typing", socket.userName);
  });

  socket.on("remove-typing", () => {
    io.sockets.emit("remove-typing", socket.userName);
  });
});

io.on("disconnect", (socket) => {
  console.log(`socket ${socket} disconnected`);
});

httpServer.listen(3000);
