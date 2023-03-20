const express = require("express");
const app = express();
const port = 3030;
const multer = require("multer");

app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname.split(".");
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + orgName[orgName.length - 1]
    );
  },
});

var storageJPEG = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".JPEG");
  },
});

var upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024,
  },
});

var uploadJPEG = multer({
  storage: storageJPEG,
});

app.post("/uploadfile", (req, res, next) => {
  var upload2 = upload.single("myFile");
  upload2(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.send("Kích thước file lớn hơn 1MB");
    }
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    res.send(file);
  });
});

//Upload JPEG
app.post("/upload/photo", (req, res, next) => {
  var upload3 = uploadJPEG.single("myImageJPEG");
  upload3(req, res, (err) => {
    const file = req.file;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  });
});

//Uploading multiple files
app.post("/uploadmultiple", upload.array("myFiles", 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(files);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
