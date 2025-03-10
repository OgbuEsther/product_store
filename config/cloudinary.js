const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dlb98zagi', //enter your cloud name 
  api_key: '818232649117599', //enter your api_key
  api_secret: 'udn5wq3dGFPKIAaMCYxAPDCChak', //enter your api_secret
  secure: true
});


module.exports = cloudinary