import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async salvar(file: any) {
    const uploadParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now().toString() + '-' + file.originalname,
      Body: file.buffer,
      ACL: 'public-read',
    };

    console.log('uploadParams', uploadParams)

    return new Promise((resolve, reject) => {
      this.s3.upload(uploadParams, (error, data) => {
        if (error) {
          reject(error);
        }
        resolve({ imageUrl: data.Location });
      });
    });
  }
}