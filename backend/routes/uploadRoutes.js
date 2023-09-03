import express from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize S3 service
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Multer upload (memory storage keeps file data in a buffer)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // keep images size < 5 MB
  fileFilter: function(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(new Error('Images only!'));
  },
});

router.post('/', upload.single('image'), (req, res) => {
  const file = req.file;
  const s3FileURL = `${process.env.AWS_Uploaded_File_URL_LINK}${file.originalname}`;

  let params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read', // could be 'private' as well
  };

  // Uploading files to the bucket
  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: s3FileURL,
      });
    }
  });
});

export default router;
