import { Module } from '@nestjs/common';
import { ModulosController } from './modulos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModulosSchema } from './schemas/modulos.schema';
import { ModulosService } from './modulos.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Modulos', schema:ModulosSchema}])],
  providers: [ModulosService],
  controllers: [ModulosController],
  exports:[MongooseModule, ModulosService]
})
export class ModulosModule {}

