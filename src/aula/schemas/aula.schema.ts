import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Modulos } from "src/modulos/schemas/modulos.schema";

export type AulaDocument = Document & Aula;

@Schema()
export class Aula {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Modulos' })
    modulo: Modulos;

    @Prop({ required: true })
    name_aula: string;

    @Prop({ required: true })
    descricao_aula: string;

    @Prop({ required: true })
    url_video: string; 
}

export const AulaSchema = SchemaFactory.createForClass(Aula);

