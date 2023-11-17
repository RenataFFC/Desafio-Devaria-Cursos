import { IsUrl, MinLength} from 'class-validator'
import { AulaMessagesHelper } from '../helpers/messages.helper';

export class AulaDto {
    @MinLength(2, {message: AulaMessagesHelper.AULA_NAME_NOT_VALID})
    name_aula:string;  

    @MinLength(2, {message: AulaMessagesHelper.AULA_DESCRICAO_NOT_VALID})
    descricao_aula:string;   
    
    @IsUrl({}, { message: AulaMessagesHelper.AULA_URL_VIDEO_NOT_VALID }) 
    url_video: string;
     
    
}