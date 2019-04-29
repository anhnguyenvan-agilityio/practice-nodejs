// import express from "express";
// import fs from "fs";
// import bodyParser from "body-parser";
// import jwt from "jsonwebtoken";

// const PORT = 3000;
// const app = express();
// app.use(bodyParser.json());
// app.set("json spaces", 4);

// // FORMAT OF TOKEN
// // Bearer <access_token>
// // Verify token
// function verifyToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (bearerHeader) {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     // Next
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// }

// app.post("/login", (req, res) => {
//   const user = {
//     id: 1,
//     username: "a",
//     email: "a@gmail.com"
//   };
//   jwt.sign({ user }, "secretkey", (err, token) => {
//     res.json({
//       token
//     });
//   });
// });

// app.get("/listUsers", (req, res) => {
//   fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(err, data) {
//     if (err) {
//       res.status(412).json({
//         msg: err.message
//       });
//     } else {
//       res.json(JSON.parse(data));
//     }
//   });
// });

// app.get("/:id", function(req, res) {
//   // First read existing users.
//   fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(err, data) {
//     if (err) {
//       res.status(412).json({
//         msg: err.message
//       });
//     } else {
//       const users = JSON.parse(data);
//       const user = users["user" + req.params.id];
//       res.json(user);
//     }
//   });
// });

// app.post("/addUser", verifyToken, (req, res) => {
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     console.log(req.token);
//     console.log(err);
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(
//         err,
//         data
//       ) {
//         if (err) {
//           res.json({
//             msg: err.message
//           });
//         } else {
//           data = JSON.parse(data);
//           if (req.body.name) {
//             const userAdded = {
//               id: 4,
//               name: req.body.name,
//               password: "password4",
//               profession: "teacher"
//             };
//             data["user4"] = userAdded;
//             fs.writeFile(
//               __dirname + "/" + "mockUsers.json",
//               JSON.stringify(data),
//               "utf8",
//               function(err) {
//                 if (err)
//                   res.json({
//                     msg: err.message
//                   });
//                 else res.json(authData);
//               }
//             );
//           } else {
//             res.json({
//               msg: "Format invalid"
//             });
//           }
//         }
//       });
//     }
//   });
// });

// app.delete("/deleteUser/:id", function(req, res) {
//   // First read existing users.
//   fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(err, data) {
//     if (err) {
//       res.json({
//         msg: err.message
//       });
//     }
//     {
//       data = JSON.parse(data);
//       delete data["user" + req.params.id];
//       fs.writeFile(
//         __dirname + "/" + "mockUsers.json",
//         JSON.stringify(data),
//         "utf8",
//         function(err) {
//           if (err) {
//             res.json({
//               msg: err.message
//             });
//           } else {
//             res.json({
//               id: req.params.id
//             });
//           }
//         }
//       );
//     }
//   });
// });

// app.listen(PORT, () => console.log(`NTask API - Port ${PORT}`));

var express = require("express");
var app = new express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var port = process.env.port || 3000;

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.redirect("index.html");
});

io.on("connection", function(socket) {
  socket.on("stream", function(image) {
    socket.broadcast.emit("stream", image);
  });
});

http.listen(port, function() {
  console.log("Server running at port " + port);
});
