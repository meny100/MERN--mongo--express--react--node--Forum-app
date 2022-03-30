const users = require('./routes/users');
const signin = require('./routes/signin');
const posts = require('./routes/posts');
const config = require("config")
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connect to mongoose
const username = config.get('username');
const password = config.get('password');
const cluster = config.get('cluster');
const dbname = config.get('dbname');
mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("mongoDB connected successfully");
});

app.use(cors());
app.use(express.json());

app.use('/api/users', users);
app.use('/api/signin', signin);
app.use('/api/posts', posts);

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});