import express from "express";
import { engine } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.engine("hbs", engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.get("/", (req, res) => {
  res.render("bai2");
});

app.get("/bai3", (req, res) => {
  res.render("bai3");
});

app.listen(3003, () => {
  console.log("express-handlebars server listening on: 3000");
});
