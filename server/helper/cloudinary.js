const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'djtzubfum', 
    api_key: '614927782567129', 
    api_secret: 'iA6tcddyYJpahBqiZ5iNeyUFMWc'
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    });
    return result;
}

const upload = multer({ storage });

module.exports = {
    imageUploadUtils,
    upload,
};