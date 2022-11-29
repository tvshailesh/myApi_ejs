const path = require("path");
const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();
var parseUrl = require("body-parser");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "myapi_crud",
});

connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database connected!");
});
// view engine setup
// app.set("view engine", "ejs");
// app.use(express.static("views"));
// app.set("views", path.join(__filename, "views"));
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')
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
  // connection.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
  //     if(error){
  //         console.log(error)
  //     }

  //     // if( result.length > 0 ) {
  //     //     return res.render('signup', {
  //     //         message: 'This email is already in use'
  //     //     })
  //     // } else if(password !== password) {
  //     //     return res.render('signup', {
  //     //         message: 'This email is already in use'
  //     //     })
  //     // }

  //     // let hashedPassword = await bcrypt.hash(password, 8)

  //     // console.log(hashedPassword)
  console.log("@@@@@", first_name, last_name, email, password);
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
app.listen(3000, () => {
  console.log("Server is Running at port 3000");
});
