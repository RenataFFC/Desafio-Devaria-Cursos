import { Injectable, Logger, NotFoundException, Param, Get } from '@nestjs/common';
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

  async criarAula(dto: AulaDto){
    try {
      this.logger.debug('criarAula - started');
      console.log('Título recebido no criarAula:', dto.name_aula); 
     
      const novaAula = new this.aulaModel(dto);      
      await novaAula.save();

      this.logger.debug('criarAula - salvo com sucesso!');
      return novaAula;
    } catch (error) {
      this.logger.error(`Erro ao salvar no banco de dados: ${error.message}`);
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
      const todasAulas = await this.aulaModel.find().populate('modulo').exec();
      this.logger.debug('listarTodasAulas - retrieved successfully');
      return todasAulas;
    } catch (error) {
      this.logger.error(`Error retrieving Aulas: ${error.message}`);
      throw error;
    }
  }

  async listarAulasPorModulo(moduloId: string): Promise<AulaDocument[]> {
    try {
      this.logger.debug(`listarAulasPorModulo - started for module ID: ${moduloId}`);
      console.log(moduloId)
       const aulasDoModulo = await this.aulaModel.find({ 'moduloId': moduloId }).exec();
      this.logger.debug('listarAulasPorModulo - retrieved successfully');
      return aulasDoModulo;
    } catch (error) {
      this.logger.error(`Error retrieving Aulas by Module: ${error.message}`);
      throw error;
    }
  }
}


  /*async listarAulasPorModulo(moduloId: string): Promise<AulaDocument[]> {
    try {
      this.logger.debug(`listarAulasPorModulo - started for module ID: ${moduloId}`);
      const aulasDoModulo = await this.aulaModel.find({ 'modulo._id': moduloId }).exec();
      this.logger.debug('listarAulasPorModulo - retrieved successfully');
      return aulasDoModulo;
    } catch (error) {
      this.logger.error(`Error retrieving Aulas by Module: ${error.message}`);
      throw error;
    }
  }*/





/*import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async criarAula(dto: AulaDto){
    try {
      this.logger.debug('criarAula - started');
      console.log('Título recebido no criarAula:', dto.name_aula); 
     
      const novaAula = new this.aulaModel(dto);      
      await novaAula.save();

      this.logger.debug('criarAula - salvo com sucesso!');
      return novaAula;
    } catch (error) {
      this.logger.error(`Erro ao salvar no banco de dados: ${error.message}`);
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
        const todasAulas = await this.aulaModel.find().populate('modulo').exec();
        this.logger.debug('listarTodasAulas - retrieved successfully');
        return todasAulas;
    } catch (error) {
        this.logger.error(`Error retrieving Aulas: ${error.message}`);
        throw error;
    }

    async listarAulasPorModulo(moduloId: string): Promise<AulaDocument[]> {
      try {
        this.logger.debug(`listarAulasPorModulo - started for module ID: ${moduloId}`);
        const aulasDoModulo = await this.aulaModel.find({ 'modulo._id': moduloId }).exec();
        this.logger.debug('listarAulasPorModulo - retrieved successfully');
        return aulasDoModulo;
      } catch (error) {
        this.logger.error(`Error retrieving Aulas by Module: ${error.message}`);
        throw error;
      }
    }
}




  /*async listarTodasAulas(): Promise<AulaDocument[]> {
    try {
      this.logger.debug('listarTodasAulas - started');
      const todasAulas = await this.aulaModel.find({}, 'name_aula descricao_aula url_video').exec();
      this.logger.debug('listarTodasAulas - retrieved successfully');
      return todasAulas;
    } catch (error) {
      this.logger.error(`Error retrieving Aulas: ${error.message}`);
      throw error;
    }
  }*/

