/* eslint-disable no-unused-vars */
const AWS = require('aws-sdk');
const fs = require('fs');
// The access ID and secret key of the S3 bucket
const ID = process.env.S3_ID;
const SECRET = process.env.S3_SECRET;

// The name of the bucket that you have created
const BUCKET_NAME = 'cis557sp21';

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

// upload a file
const uploadFile = (fileName) => {
  console.log(`fileNme ${fileName}`);
  console.log(`The current Location is ${process.cwd()}`);

  const tmpPath = './uploads/';
  const fileContent = fs.readFileSync(tmpPath + fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name we want to upload
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully, data =  ${data.Key}`);
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

// read a file
// const readFile = (fileName) => {
//   // Setting up S3 read parameters
//   const params = {
//     Bucket: BUCKET_NAME,
//     Key: fileName, // File name we want to retrieve
//   };

//   // download file from the bucket
//   s3.getObject(params, (err, data) => {
//     if (err) {
//       throw err;
//     }
//     // do something with the file
//     const fStream = fs.createReadStream(fileName);
//     // fStream.write(data.Body);
//     // fStream.end();

//     console.log(`File downloaded successfully. ${data.Body}`);
//   });
// };
// downloads a file from s3
function readFile(fileName) {
  const downloadParams = {
    Key: fileName,
    Bucket: BUCKET_NAME,
  };

  return s3.getObject(downloadParams).createReadStream();
}

async function checkKey(fileName) {
  const downloadParams = {
    Key: fileName,
    Bucket: BUCKET_NAME,
  };
  const b = await s3.headObject(downloadParams).promise().then(() => 1).catch((err) => 0);
  // console.log();
  return b;
}
// delete a file
const deleteFile = (fileName) => {
  // Setting up S3 delete parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName, // File name we want to delete
  };

  // download file from the bucket
  s3.deleteObject(params, (err, data) => {
    if (err) {
      throw err;
    }
    console.log(`File deleted successfully. ${data}`);
  });
};

module.exports = {
  checkKey, uploadFile, readFile, deleteFile,
};
