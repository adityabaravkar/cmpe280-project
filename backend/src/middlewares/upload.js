const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: "+GFyMyJeQodOGIABXp7OWWNTGaCXiBbUKHEct2a4",
  accessKeyId: "AKIAUBCTL4BO4CJHABFS",
  region: "us-west-1",
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "splitwise-images-adityabaravkar",
    key(req, file, cb) {
      console.log(file);
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  }),
});

module.exports = upload;
