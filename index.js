var bodyParser = require("body-parser");
var express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const connect = mongoose.connect(
  "mongodb://localhost:27017/mern-test?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

const port = 4000;
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teachersRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const scoreRoutes = require("./routes/scoreRoutes");

var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("connected to the server");
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontEnd/index.html"));
});

app.use(express.static(__dirname + "/public")).use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/student", studentRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/scores", scoreRoutes);
