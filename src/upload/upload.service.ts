import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { promisify } from 'util';

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
      Bucket: process.env.S3_BUCKET_NAME, // Corrigindo para usar o nome do bucket
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    
    };

    console.log('uploadParams', uploadParams);

    const uploadAsync = promisify(this.s3.upload.bind(this.s3));

    try {
      const data = await uploadAsync(uploadParams);
      return { imageUrl: data.Location };
    } catch (error) {
      console.error('Erro durante o upload:', error);
      throw error;
    }
  }
}
