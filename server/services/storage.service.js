const AWS = require('aws-sdk');
const fs = require('fs');

let {AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_REGION, S3_BUCKET} = require("../config")

AWS.config.update({
    region: S3_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

async function uploadImage({imageName, imagePath}){
    const params = {
        Bucket: S3_BUCKET,
        Key: imageName,
        Body: fs.createReadStream(imagePath)
    };

    return new Promise((resolve, reject)=>{
        s3.upload(params, (err, data) => {
            if (err) {
                reject(`Error uploading file: ${err}`)
            } else {
                resolve(data.Location)
            }
        });
    })
}

module.exports = {uploadImage}
