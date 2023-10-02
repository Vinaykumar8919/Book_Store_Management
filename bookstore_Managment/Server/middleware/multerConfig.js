const multer = require('multer');

// Configure multer to specify where to store uploaded images and set file naming
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload'); // Adjust the destination folder as needed
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
