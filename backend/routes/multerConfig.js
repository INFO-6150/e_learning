const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require("@aws-sdk/client-s3");

console.log(process.env.AWS_REGION);
// Initialize the S3 client
const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'AKIAROPPBG5CTHEULRNB',
    secretAccessKey: 'yUPox1g0pL/3azw7P74IuOe28OrsEo21bWiePJQp'
  }
});


const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'mynestdata', // Replace with your actual bucket name
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  })
});

module.exports = upload;

