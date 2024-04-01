import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Modulos } from "src/modulos/schemas/modulos.schema";

@Schema()
export class Aula {
    @Prop({ type: Types.ObjectId, ref: 'Modulos' })
    modulo: Modulos;

    @Prop({required:true})
    name_aula: string;

    @Prop({required:true})
    descricao_aula: string;

    @Prop({required:true})
    url_video: string; 
    
    @Prop({required:true})
    moduloId: string;
}

export type AulaDocument = Aula & Document;

export const AulaSchema = SchemaFactory.createForClass(Aula);

