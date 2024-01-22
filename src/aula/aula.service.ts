import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AulaDto } from './dtos/aula.dto';
import { AulaDocument } from './schemas/aula.schema';
import { UpdateAulaDto } from './dtos/updateaula.dto';
import { UploadService } from './../upload/upload.service';


@Injectable()
export class AulaService {
  private logger = new Logger(AulaService.name);

  constructor(
    @InjectModel('Aula') private readonly aulaModel: Model<AulaDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async criarAula(dto: AulaDto): Promise<AulaDocument> {
    try {
      this.logger.debug('criarAula - started');
      const uploadResult = await this.uploadService.salvar(dto.video, 'video');

      const novaAula = new this.aulaModel({
        name_aula: dto.name_aula,
        descricao_aula: dto.descricao_aula,
        url_video: uploadResult.fileUrl,
      });

      const aulaSalva = await novaAula.save();
      this.logger.debug('criarAula - salvo com sucesso!');

      return aulaSalva;
    } catch (error) {
      this.logger.error(`Error creating Aula: ${error.message}`);
      throw error;
    }
  }

  async editarAula(aulaId: string, dto: UpdateAulaDto) {
    try {
      this.logger.debug('editarAula - started');
      const aulaExistente = await this.aulaModel.findById(aulaId).exec();

      if (!aulaExistente) {
        throw new NotFoundException(`Aula com ID ${aulaId} não encontrada`);
      }

      aulaExistente.set(dto);
      await aulaExistente.save();
      this.logger.debug('editarAula - saved successfully');
    } catch (error) {
      this.logger.error(`Erro ao editar no banco de dados: ${error.message}`);
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
