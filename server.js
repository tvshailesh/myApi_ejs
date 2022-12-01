const path = require("path");
const express = require("express");
const session = require("express-session");
const ejs = require("ejs");
const mysql = require("mysql");
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

//display login page
app.get("/login", function (req, res, next) {
  res.render("login.ejs", {
    title: "Login",
    email: "",
    password: "",
  });
});

app.post("/formFillUp", (req, res) => {
  const { first_name, last_name, age, city, phone_no, email, password } =
    req.body;
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
    let Query = connection.query(
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
      (err, req) => {
        if (err) {
          console.log("error occured", err);
        } else {
          res.redirect("/login");
        }
      }
    );
    console.log("Query", Query.values);
  }
});

//login
app.post("/authentication", (req, res, next) => {
  var { email, password } = req.body;

  if (email) {
    connection.query(
      "SELECT * FROM users WHERE email = ? ",
      [email],
      function (error, resu, fields) {
        if (error) throw error;
        // If the account exists
        console.log("response",resu);
       var data = resu.find(e =>e.password == password)
        if (!data){
          res.send("Incorrect  Password!");
        } else {
        console.log("else call------>>>");
          connection.query("SELECT * From users"),
            (err, rows) => {
              if (err) throw err;
              console.log("@@@@@", err);
              console.log("reows",rows);
              req.session.loggedin = true;
              req.session.email = email;
              // Redirect to home page
              res.render("Dashboard.ejs", {
                title: "Welcome To Dashboard",
                users: rows,
              });
            };
        }
        // if (rows.length > 0) {
        //   // Authenticate the user
        //   req.session.loggedin = true;
        //   req.session.email = email;
        //   // Redirect to home page
        //   res.render("Dashboard.ejs", {
        //     title: "Welcome To Dashboard",
        //     users: rows,
        //   });
        // } else {
        //   res.send("Incorrect email and/or Password!");
        // }
        res.end();
      }
    );
  } else {
    res.send("Please enter email and Password!");
    res.end();
  }
});

//logout
app.get("/logout", function (req, res, next) {
  // If the user is loggedin
  if (req.session.loggedin) {
    req.session.loggedin = false;
    res.redirect("/login");
  } else {
    // Not logged in
    res.redirect("/");
  }
});

//server Listing
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
