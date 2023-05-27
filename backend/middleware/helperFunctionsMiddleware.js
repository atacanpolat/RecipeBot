import multer from 'multer';
import path from "path";

export const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
  
// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../photos/avatar'); // Specify the destination folder for avatars
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Define the file naming convention
  }
});

// Create the multer upload instance
export const upload = multer({ storage: storage });
  
  

export default {asyncHandler, storage, upload};