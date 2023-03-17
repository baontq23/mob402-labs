const express = require("express");
const { calculate } = require("./calculator");
//import { engine } from 'express-handlebars';
const expressHbs = require("express-handlebars");

const app = express();

//app.engine('.hbs', ExpressHandlebars());
app.engine(
  ".hbs",
  expressHbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: "views/layouts/",
  })
);

//app.engine( "hbs", engine({ extname: "hbs", defaultLayout: false, layoutsDir: "views/layouts/", }) );

app.set("view engine", ".hbs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home", {
    layout: "main",
    //showContentMaytinh: false,

    helpers: {
      foo() {
        return "foo. CP17305 - server Android";
      },
    },
  });
});

app.get("/maytinh", (req, res) => {
  res.render("emptyView", {
    layout: "main",
    showContentMaytinh: true,
    soA: 15,
    soB: 7,
    phepTinh: "cong",
    kq: 22,
  });
});

app.post("/result/:a/:b/:operator", (req, res) => {
  const { a, b, operator } = req.params;
  res.send(calculate(a, b, operator));
});

const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
