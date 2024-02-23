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

  async obterUrl(nomeArquivo: string): Promise<string> {
    // Lógica para obter a URL correspondente ao nome do arquivo
    return `URL_BASE/${nomeArquivo}`; // Substitua 'URL_BASE' pela base da URL onde as imagens são hospedadas
  }

  async salvar(file: any):Promise<String>{
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
          console.log("erro", error)
          reject(error);
        }
        if(data){
          console.log(data)
          resolve(data.Location);
        }else{
          reject("Erro ao subir a imagem")
        }
      });
    });
  }
}
