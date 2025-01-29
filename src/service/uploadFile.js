const multer = require('multer')
const path = require("path")

function storage_img() {
    return multer.diskStorage({
        destination: path.join(__dirname, '../public/files/image_/'),
        filename: function (req, file, done) {
            const parts = file.originalname.split(".");
            const extension = parts[parts.length - 1];
            done(null, "image_" + btoa(Date.now() + file.originalname).substring(0, 15) + `.${extension}`);
        }
    })
}

module.exports = { storage_img }
