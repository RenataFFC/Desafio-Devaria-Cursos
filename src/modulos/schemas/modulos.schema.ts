import {Schema, Prop , SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ModulosDocument = HydratedDocument<Modulos>;

@Schema()
export class Modulos { 
  @Prop({require:true})
  name_modulo: string; 
}

export const ModulosSchema = SchemaFactory.createForClass(Modulos);