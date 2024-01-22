// upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from '../upload/upload.controller';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService], 
})
export class UploadModule {}
