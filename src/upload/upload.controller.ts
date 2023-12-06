import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import {
    FileInterceptor,
  } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
  
  @Controller('upload')
  export class UploadController {
    constructor(private readonly uploadService: UploadService) { }
  
    @Post()
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(FileInterceptor('file'))
    uploadArquivo(@UploadedFile() file: any) {
      return this.uploadService.salvar(file);
    }
  }
  