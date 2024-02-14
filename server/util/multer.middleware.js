const multer  = require('multer')
const upload = multer({ dest: `${__dirname}/tmp/` })

const addItemMiddleware = upload.single('itemImage')

module.exports = { addItemMiddleware }