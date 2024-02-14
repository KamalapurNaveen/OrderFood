const dotenv = require('dotenv');
dotenv.config();

const PORT                  = process.env.PORT
const JWT_KEY               = process.env.JWT_KEY
const FORGET_PASSWORD_KEY   = process.env.FORGET_PASSWORD_KEY
const MONGO_URL             = process.env.MONGO_URL
const AWS_ACCESS_KEY_ID     = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const S3_REGION             = process.env.S3_REGION
const S3_BUCKET             = process.env.S3_BUCKET
const NODEMAILER_EMAIL      = process.env.NODEMAILER_EMAIL
const NODEMAILER_PWD        = process.env.NODEMAILER_PWD

module.exports = {
    PORT,
    JWT_KEY,
    FORGET_PASSWORD_KEY,
    MONGO_URL,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    S3_REGION,
    S3_BUCKET,
    NODEMAILER_EMAIL, 
    NODEMAILER_PWD
}

