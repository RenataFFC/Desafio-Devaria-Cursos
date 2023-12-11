// upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService], // Adicione esta linha para exportar o serviço
})
export class UploadModule {}
