import { IsUrl, MinLength} from 'class-validator'
import { ModuloMessagesHelper } from '../helpers/messages.helper';

export class UpdateModulosDto {
    @MinLength(2, {message: ModuloMessagesHelper.MODULO_TITULO_NOT_VALID})
    titulo: string;   
    @IsUrl({}, { message: ModuloMessagesHelper.MODULO_IMAGEM_NOT_VALIDO })
    image_modulo: string;
}