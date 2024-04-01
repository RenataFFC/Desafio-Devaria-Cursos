import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { ModulosDto } from './dtos/modulos.dto';
import { ModulosDocument, Modulos } from './schemas/modulos.schema'; // Importe Modulos também
import { UpdateModulosDto } from './dtos/updatemodulos.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class ModulosService {

  private logger = new Logger(ModulosService.name);

  constructor(
    @InjectModel('Modulos') private readonly modulosModel: Model<ModulosDocument>,
    private readonly uploadService: UploadService,
  ) {}

  async criarModulo(dto: ModulosDto) {
    try {
      this.logger.debug('criarModulo - iniciado');
      console.log('Título recebido no criarModulo:', dto.titulo);       
      // Criando um novo módulo com as informações atualizadas
      const novoModulo = new this.modulosModel(dto);
      await novoModulo.save();

      this.logger.debug('criarModulo - salvo com sucesso!');
      return novoModulo;
    } catch (error) {
      this.logger.error(`Erro ao salvar no banco de dados: ${error.message}`);
      throw error;
    }
  }
  
  async editarModulo(moduloId: string, dto: UpdateModulosDto) {
    try {
      this.logger.debug('editarModulo - iniciado');

      const moduloExistente = await this.modulosModel.findById(moduloId).exec();

      if (!moduloExistente) {
        throw new NotFoundException(`Módulo com ID ${moduloId} não encontrado`);
      }

      moduloExistente.set(dto);
      await moduloExistente.save();

      this.logger.debug('editarModulo - salvo com sucesso');
      return moduloExistente;
    } catch (error) {
      this.logger.error(`Erro ao editar no banco de dados: ${error.message}`);
      throw error;
    }
  }

  async excluirModulo(moduloId: string) {
    try {
      this.logger.debug('excluirModulo - iniciado');

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

      this.logger.debug('excluirModulo - excluído com sucesso');
    } catch (error) {
      this.logger.error(`Erro ao excluir do banco de dados: ${error.message}`);
      throw error;
    }
  } 

  async listarTodosModulos(): Promise<any[]> {
    const modulos = await this.modulosModel.find().exec();
    // Para cada módulo, obtenha a URL da imagem e adicione-a aos dados do módulo
    const modulosComImagens = await Promise.all(
      modulos.map(async (modulo) => {
        // Obtenha a URL da imagem para este módulo
        const urlImagem = await this.uploadService.obterUrl(modulo.image_modulo);
        // Adicione a URL da imagem aos dados do módulo
        return { ...modulo.toObject(), url_imagem: urlImagem };
      })
    );
    return modulosComImagens;
  }
}

  /*async listarTodosModulos(): Promise<Modulos[]> { // Alteração no tipo de retorno
    const modulos = await this.modulosModel.find().exec();
    // Para cada módulo, obtenha a URL da imagem e adicione-a aos dados do módulo
    const modulosComImagens = await Promise.all(
      modulos.map(async (modulo) => {
        // Obtenha a URL da imagem para este módulo
        const urlImagem = await this.uploadService.obterUrl(modulo.image_modulo);
        // Adicione a URL da imagem aos dados do módulo
        return { ...modulo.toObject(), url_imagem: urlImagem };
      })
    );
    return modulosComImagens;
  }
}*/
