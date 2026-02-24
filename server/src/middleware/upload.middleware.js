import multer from 'multer';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

export const validateImages = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'At least 1 image is required' });
  }
  
  if (req.files.length > 4) {
    return res.status(400).json({ message: 'Maximum 4 images allowed' });
  }
  
  next();
};