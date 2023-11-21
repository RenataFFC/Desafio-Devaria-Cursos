import { MinLength} from 'class-validator'
import { MessagesHelper } from '../helpers/messages.helper';

export class UpdateModulosDto {
  @MinLength(2, {message: MessagesHelper.AULA_NAME_NOT_VALID})
    name_aula:string;  

    @MinLength(2, {message: MessagesHelper.AULA_DESCRICAO_NOT_VALID})
    descricao_aula:string;   
    
    @IsUrl({}, { message: MessagesHelper.AULA_URL_VIDEO_NOT_VALID }) 
    url_video: string;  
}