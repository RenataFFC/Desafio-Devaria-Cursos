import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModulosDto } from './dtos/modulos.dto';
import { ModulosDocument } from './schemas/modulos.schema';

@Injectable()
export class ModulosService {
  private logger = new Logger(ModulosService.name);

  constructor(@InjectModel('Modulos') private readonly modulosModel: Model<ModulosDocument>) {}

  async modulos(dto: ModulosDto) {
    try {
      this.logger.debug('modulos - started');
      const novoModulo = new this.modulosModel(dto); // Crie uma nova instância do modelo
      await novoModulo.save(); // Salve a nova instância no banco de dados
      this.logger.debug('modulos - saved successfully');
    } catch (error) {
      this.logger.error(`Error saving to database: ${error.message}`);
      throw error; // Lança a exceção novamente para que seja tratada em níveis superiores
    }
  }
}
