import multer from "multer";

// Store uploaded files temporarily in memory
const storage = multer.memoryStorage();

// Accept only CSV files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
