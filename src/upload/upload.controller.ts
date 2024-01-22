// upload.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new HttpException('Arquivo não enviado', HttpStatus.BAD_REQUEST);
      }

      const result = await this.uploadService.salvar(file ,'seuFolderAqui');

      return {
        success: true,
        fileUrl: result.fileUrl,
      };
    } catch (error) {
      throw new HttpException(`Erro durante o upload: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}