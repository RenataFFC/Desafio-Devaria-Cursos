// aula.service.ts

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AulaDto } from './dtos/aula.dto';
import { AulaDocument } from './schemas/aula.schema';

@Injectable()
export class AulaService {
  private logger = new Logger(AulaService.name);

  constructor(@InjectModel('Aula') private readonly aulaModel: Model<AulaDocument>) {}

  async criarAula(dto: AulaDto): Promise<AulaDocument> {
    try {
      this.logger.debug('criarAula - started');

      const novaAula = new this.aulaModel({
        name_aula: dto.name_aula,
        descricao_aula: dto.descricao_aula,
        url_video: dto.url_video,
      });

      const aulaSalva = await novaAula.save();
      this.logger.debug('criarAula - saved successfully');

      return aulaSalva;
    } catch (error) {
      this.logger.error(`Error saving to database: ${error.message}`);
      throw error;
    }
  }

  async editarAula(id: string, dto: AulaDto): Promise<AulaDocument> {
    try {
      this.logger.debug(`editarAula - started for ID: ${id}`);

      const aulaAtualizada = await this.aulaModel.findByIdAndUpdate(
        id,
        {
          name_aula: dto.name_aula,
          descricao_aula: dto.descricao_aula,
          url_video: dto.url_video,
        },
        { new: true },
      );

      if (!aulaAtualizada) {
        throw new NotFoundException('Aula não encontrada');
      }

      this.logger.debug(`editarAula - updated successfully for ID: ${id}`);
      return aulaAtualizada;
    } catch (error) {
      this.logger.error(`Error updating Aula: ${error.message}`);
      throw error;
    }
  }

  async excluirAula(id: string): Promise<void> {
    try {
      this.logger.debug(`excluirAula - started for ID: ${id}`);

      const aulaExcluida = await this.aulaModel.findByIdAndDelete(id);

      if (!aulaExcluida) {
        throw new NotFoundException('Aula não encontrada');
      }

      this.logger.debug(`excluirAula - deleted successfully for ID: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting Aula: ${error.message}`);
      throw error;
    }
  }

  async listarTodasAulas(): Promise<AulaDocument[]> {
    try {
      this.logger.debug('listarTodasAulas - started');

      const todasAulas = await this.aulaModel.find().exec();

      this.logger.debug('listarTodasAulas - retrieved successfully');
      return todasAulas;
    } catch (error) {
      this.logger.error(`Error retrieving Aulas: ${error.message}`);
      throw error;
    }
  }
}
