import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AulaDto } from './dtos/aula.dto'; // Certifique-se de que você tenha um DTO AulaDto
import { AulaDocument } from './schemas/aula.schema';

@Injectable()
export class AulaService {
  private logger = new Logger(AulaService.name);

  constructor(@InjectModel('Aula') private readonly aulaModel: Model<AulaDocument>) {}

  async aula(dto: AulaDto) {
    try {
      this.logger.debug('aula - started');
      
      // Certifique-se de incluir a URL do vídeo no objeto dto
      const novaAula = new this.aulaModel({ 
        name_aula: dto.name_aula,
        descricao_aula: dto.descricao_aula,
        url_video: dto.url_video,
      });

      await novaAula.save();
      this.logger.debug('aula - saved successfully');
    } catch (error) {
      this.logger.error(`Error saving to database: ${error.message}`);
      throw error;
    }
  }
}