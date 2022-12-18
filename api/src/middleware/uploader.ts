import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (req.query.type) {
      case "product":
        cb(null, path.join(__dirname, "/../public/products/"));

      // default:
      //   cb(null, path.join(__dirname, "/../public/uploads/"));
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.query.type + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

export const uploader = multer({ storage }).any();
