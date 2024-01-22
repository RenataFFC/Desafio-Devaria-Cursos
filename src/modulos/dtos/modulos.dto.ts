import { MinLength, IsUrl, IsOptional, IsString } from 'class-validator';
import { ModuloMessagesHelper } from '../helpers/messages.helper';

export class ModulosDto {
    @MinLength(2, { message: ModuloMessagesHelper.MODULO_TITULO_NOT_VALID })
    titulo: string;

    @IsString({ message: ModuloMessagesHelper.MODULO_IMAGEM_NOT_VALIDO })
    image_modulo: string;

    @IsUrl({}, { message: ModuloMessagesHelper.MODULO_IMAGEM_NOT_VALIDO })
    @IsOptional()
    video_modulo: string;
}
