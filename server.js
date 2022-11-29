const path = require("path");
const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();
var parseUrl = require("body-parser");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password:process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database connected!");
});
app.use(parseUrl.json());
app.use(parseUrl.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Set view engine as EJS
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  // res.send({ message: `API Working` })
  res.render("signup.ejs");
});

app.post("/formFillUp", (req, res) => {
  const { first_name, last_name, age, city, phone_no, email, password  } = req.body;
  if (first_name == "" || last_name == "" || age == "" || city == "" || phone_no == "" || email == "" || password == "") {
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
          console.log("error occured");
        } else {
          res.render("formsubmit.ejs");
        }
      }
    );
  }
});

//server Listing
const PORT = process.env.PORT ;
app.listen(PORT, () => {
 console.log( `Server started on port ${PORT}`)
  });
  
