import config from '../../config';
import { S3Client } from '@aws-sdk/client-s3';
import multerS3 from 'multer-s3';

import { BadRequestException } from '@nestjs/common';

export const mediaAvailableMimeTypes = [
  'image/bmp',
  'image/ief',
  'image/jpeg',
  'image/pipeg',
  'image/svg+xml',
  'image/tiff',
  'image/png',
  'video/webm',
  'video/ogg',
];

const s3 = new S3Client({
  region: config.aws.region,
  credentials: {
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey,
  },
});

const mediaFileMulterConfig = {
  storage: multerS3({
    s3,
    bucket: config.aws.bucketName,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
  limits: {
    fileSize: config.aws.maxFileSize,
  },
  fileFilter: (req, file, cb) => {
    const checkFileType = mediaAvailableMimeTypes.includes(file.mimetype);

    if (!checkFileType) {
      cb(new BadRequestException());

      return;
    }

    cb(null, true);
  },
};

export { mediaFileMulterConfig };
