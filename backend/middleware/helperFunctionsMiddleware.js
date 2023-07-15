import path from "path";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const multer = require("multer");

export const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};

export var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "photos/avatar");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

export var upload = multer({ storage: storage });

export default { asyncHandler, storage, upload };
