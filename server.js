const path = require("path");
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const app = express();
var parseUrl = require("body-parser");
var connection = require("./connection/Db");

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 6000,
    },
  })
);
app.use(parseUrl.json());
app.use(parseUrl.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine as EJS
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("signup.ejs");
});
2;
//display login page
app.get("/login", function (req, res, next) {
  res.render("login.ejs", {
    title: "Login",
    email: "",
    password: "",
  });
});

// signup page
app.post("/formFillUp", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const { first_name, last_name, age, city, phone_no, email } = req.body;
  const password = await bcrypt.hash(req.body.password, salt);
  var allRegisterdData;
  connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    allRegisterdData = result[0].email;
    console.log("All Data", allRegisterdData);
  });

  if (
    first_name == "" ||
    last_name == "" ||
    age == "" ||
    city == "" ||
    phone_no == "" ||
    email == "" ||
    password == ""
  ) {
    console.log("Please fill form");
    //  res.render("signup.ejs");
  } else {
    let Query1 = connection.query(
      "SELECT * FROM users WHERE email = ? ",
      [email],
      function (error, resu, fields) {
        if (error) throw error;
        if (resu.length > 0) {
          res.send("Email already Exist");
        } else {
          connection.query(
            "INSERT INTO users SET?",
            {
              first_name: first_name,
              last_name: last_name,
              age: age,
              city: city,
              phone_no: phone_no,
              email: email,
              password: password,
            },
            (err, req, result) => {
              console.log("request=-=-=-=-=-=-=-", result);
              if (err) {
                console.log("error occured", err);
              } else {
                res.redirect("/login");
              }
            }
          );
        }
      }
    );
  }
});

//login Auth
app.post("/authentication", (req, res, next) => {
  var { email, password } = req.body;
  var allData;
  connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    allData = result;
  });
  if (email) {
    connection.query(
      "SELECT * FROM users WHERE email = ? ",
      [email],
      function (error, resu, fields) {
        if (error) throw error;
        bcrypt.compare(password, resu[0].password, function (err, result) {
          // console.log("@#@#@@$$#$$", result);
          if (result) {
            res.render("Dashboard.ejs", {
              title: "Welcome To Dashboard",
              users: allData,
            });
          } else {
            console.log("Invalid password!");
          }
        });
      }
    );
  } else {
    res.send("Please enter email and Password!");
    res.end();
  }
});

// user edit
app.get("/user_edit/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("$$$$$$$", userId);
  let sql = `Select * from users where id = ${userId}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.render("user_edit.ejs", {
      title: "Edit my Data",
      user: result[0],
    });
  });
});

// update
app.post("/update", (req, res) => {
  const { first_name, last_name, age, city, phone_no, email, id } = req.body;
  var allUpdateData;
  let sql = `UPDATE users SET first_name = '${first_name}' , last_name = '${last_name}' , age = '${age}' , city = '${city}' , phone_no = '${phone_no}'  WHERE id = '${id}' ;`; //,[ req.body.first_name, req.body.last_name, req.body.age, req.body.city,  req.body.phone_no, req.body.email, req.body.id]
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    connection.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      // console.log("Updated Data==================", result);
      // allUpdateData = result;
      res.render("Dashboard.ejs", {
        title: "Updated",
        users: result,
      });
    });
    // console.log("!!!!!!!", allUpdateData);
  });
});

//Delete id
app.get("/user_delete.ejs/:userId", (req, res) => {
  const userId = req.params.userId;
  console.log("Delete id", userId);
  let sql = `Select * from users where id = ${userId}`;
  let query = connection.query(sql, (err, result) => {
    console.log("Delete Result", result);
    if (err) throw err;
    res.render("user_delete.ejs", {
      title: "Delete This Record",
      user: result[0],
    });
  });
});
// delete User
app.post("/delete", (req, res) => {
  const { id } = req.body;
  let sql = `DELETE from users where id = ${id}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    // res.render("delete.ejs");
    connection.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      res.render("Dashboard.ejs", {
        title: "Welcome to Dashboard",
        users: result,
      });
    });
    // res.send("Record Deleted");
  });
});
//logout
app.get("/logout", function (req, res, next) {
  res.redirect("/login");
});

app.get("/views/Dashboard.ejs", (req, res) => {
    connection.query("SELECT * FROM users", function (err, result, fields) {
      if (err) throw err;
      res.render("Dashboard.ejs", {
        title: "Welcome to Dashboard",
        users: result,
      });
    });
  });

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
