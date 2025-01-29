const multer = require("multer");
const { storage_img } = require("../service/uploadFile");

async function upload_image(req, res, next) {
    const file_path = await storage_img()
    const upload = multer({ storage: file_path }).single('photo')
    upload(req, res, function (err) {
        next()
    })
}

module.exports = { upload_image }