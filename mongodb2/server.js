const express = require("express");
const expressHbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const productRouter = require("./routes/sanpham.router");

const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`The Web server on port ${port}`);
});

app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    helpers: {
      increase: (value, options) => {
        return parseInt(value) + 1;
      },
      decrease: (value, options) => {
        return parseInt(value) - 1;
      },
      shortText: (value, maximum, options) => {
        if (value?.length > maximum) {
          return value.substring(0, maximum) + "...";
        } else {
          return value;
        }
      },
    },
  })
);
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/sanpham", productRouter.router);

const uri = `mongodb+srv://baontqph23876:DSOsu52y4iCBtKxR@cluster0.eemwnqy.mongodb.net/CP17305?retryWrites=true&w=majority`;

mongoose.connect(uri);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Fail: Connect error"));
db.once("open", () => {
  console.log("Connected successfully");
});

app.get("/", (req, res) => {
  res.redirect("/sanpham/list");
});
