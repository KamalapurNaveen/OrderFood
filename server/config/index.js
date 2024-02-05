const dotenv = require('dotenv');
dotenv.config();

const PORT                  = process.env.PORT
const JWT_KEY               = process.env.JWT_KEY
const MONGO_URL             = process.env.MONGO_URL
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
const CLOUDINARY_API_KEY    = process.env.CLOUDINARY_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

module.exports = {
    PORT,
    JWT_KEY,
    MONGO_URL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
}

