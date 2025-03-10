// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set up storage engine for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null , 'uploads/'); // Define the upload folder
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to avoid file name conflicts
  },
});

//bag.png.jpg.jpeg

// File filter to only accept certain file types (e.g., images)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  
  //HAND.PNG === HAND.png

  if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
    cb(null, true);
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed'), false);
  }
};

// Limit file size (e.g., 5MB per image)
const limits = { fileSize: 5 * 1024 * 1024 }; // 5 MB

// Set up multer middleware for file uploads
const upload = multer({
 storage  ,
  fileFilter,
  limits,
});

module.exports = upload;
