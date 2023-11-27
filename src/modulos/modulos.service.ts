import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModulosDto } from './dtos/modulos.dto';
import { ModulosDocument } from './schemas/modulos.schema';
import { UpdateModulosDto } from './dtos/updatemodulos.dto';

@Injectable()
export class ModulosService {
  private logger = new Logger(ModulosService.name);
  constructor(@InjectModel('Modulos') 
        private readonly modulosModel: Model<ModulosDocument>
 ) {}

  async modulos(dto: ModulosDto) {
    try {
      this.logger.debug('modulos - started');
      const novoModulo = new this.modulosModel(dto);
      await novoModulo.save();
      this.logger.debug('modulos - salvo com sucesso!');
      
      return novoModulo;
    } catch (error) {
         this.logger.error(`Erro ao salvar no banco de dados: ${error.message}`);
      throw error;
    }
  }


  async editarModulo(moduloId: string, dto: UpdateModulosDto) {
    try {
      this.logger.debug('editarModulo - started');
      const moduloExistente = await this.modulosModel.findById(moduloId).exec();

      if (!moduloExistente) {
        throw new NotFoundException(`Módulo com ID ${moduloId} não encontrado`);
      }

      moduloExistente.set(dto);
      await moduloExistente.save();
      this.logger.debug('editarModulo - saved successfully');
    } catch (error) {
      this.logger.error(`Erro ao editar no banco de dados: ${error.message}`);
      throw error;
    }
  }

  async excluirModulo(moduloId: string) {
    try {
        this.logger.debug('excluirModulo - started');

        const moduloExistente = await this.modulosModel.findById(moduloId).exec();

        if (!moduloExistente) {
            throw new NotFoundException(`Módulo com ID ${moduloId} não encontrado`);
        }

        // Verificar se há aulas associadas ao módulo
        if (moduloExistente.aulas && moduloExistente.aulas.length > 0) {
            throw new Error('Não é possível excluir o módulo pois existem aulas associadas.');
        }

        const resultado = await this.modulosModel.findByIdAndDelete(moduloId).exec();


        if (!resultado) {
            throw new NotFoundException(`Módulo com ID ${moduloId} não encontrado`);
        }

        this.logger.debug('excluirModulo - deleted successfully');
    } catch (error) {
        this.logger.error(`Erro ao excluir do banco de dados: ${error.message}`);
        throw error;
    }
  }

  async listarTodosModulos(): Promise<ModulosDocument[]> {
    try {
      this.logger.debug('listarTodasAulas - started');

      const todosModulos = await this.modulosModel.find().exec();

      this.logger.debug('listarTodasAulas - retrieved successfully');
      return todosModulos;
    } catch (error) {
      this.logger.error(`Error retrieving Aulas: ${error.message}`);
      throw error;
    }
  }
}