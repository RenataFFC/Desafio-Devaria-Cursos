import { MinLength} from 'class-validator'
import { ModuloMessagesHelper } from '../helpers/messages.helper';

export class UpdateModulosDto {
    @MinLength(2, {message: ModuloMessagesHelper.MODULO_NAME_NOT_VALID})
    name_modulo: string;   
}