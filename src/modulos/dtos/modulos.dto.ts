import { MinLength} from 'class-validator'
import { ModuloMessagesHelper } from '../helpers/messages.helper';

export class ModulosDto {
    @MinLength(2, {message: ModuloMessagesHelper.MODULO_NAME_NOT_VALID})
    name_modulo:string;   

}