import {Schema, Prop , SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Aula } from 'src/aula/schemas/aula.schema';


export type ModulosDocument = HydratedDocument<Modulos>;

@Schema()
export class Modulos { 
  @Prop({required:true})
  titulo: string; 

  @Prop({required:true})
  image_modulo: string;

  @Prop()
  aulas: Aula[];
}

export const ModulosSchema = SchemaFactory.createForClass(Modulos);