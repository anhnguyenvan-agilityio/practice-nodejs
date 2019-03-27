import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.set("json spaces", 4);

app.get("/listUsers", (req, res) => {
  fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(err, data) {
    if (err) {
      res.status(412).json({
        msg: err.message
      });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.get("/:id", function(req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(err, data) {
    if (err) {
      res.status(412).json({
        msg: err.message
      });
    } else {
      const users = JSON.parse(data);
      const user = users["user" + req.params.id];
      res.json(user);
    }
  });
});

app.post("/addUser", (req, res) => {
  fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(err, data) {
    if (err) {
      res.json({
        msg: err.message
      });
    } else {
      data = JSON.parse(data);
      if (req.body.name) {
        const userAdded = {
          id: 4,
          name: req.body.name,
          password: "password4",
          profession: "teacher"
        };
        data["user4"] = userAdded;
        fs.writeFile(
          __dirname + "/" + "mockUsers.json",
          JSON.stringify(data),
          "utf8",
          function(err) {
            if (err)
              res.json({
                msg: err.message
              });
            else res.json(userAdded);
          }
        );
      } else {
        res.json({
          msg: "Format invalid"
        });
      }
    }
  });
});

app.delete("/deleteUser/:id", function(req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "mockUsers.json", "utf8", function(err, data) {
    if (err) {
      res.json({
        msg: err.message
      });
    }
    {
      data = JSON.parse(data);
      delete data["user" + req.params.id];
      fs.writeFile(
        __dirname + "/" + "mockUsers.json",
        JSON.stringify(data),
        "utf8",
        function(err) {
          if (err) {
            res.json({
              msg: err.message
            });
          } else {
            res.json({
              id: req.params.id
            });
          }
        }
      );
    }
  });
});

app.listen(PORT, () => console.log(`NTask API - Port ${PORT}`));
