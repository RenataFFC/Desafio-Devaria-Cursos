import {  Controller,  HttpCode,  HttpStatus,  Post,  Put,  Body, Res, Param,  Delete,  Get,  UseInterceptors,  UploadedFile,} from "@nestjs/common";
import { IsPublic } from "src/auth/decorators/ispublic.decorator";
import { AulaDto } from "./dtos/aula.dto";
import { AulaService } from "./aula.service";
import { UpdateAulaDto } from "./dtos/updateaula.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("aula")
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  register(@Body() dto: AulaDto) {
    console.log(dto);
    return this.aulaService.criarAula(dto);
  }

  @Get("listar")
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async listarTodasAulas() {
    return this.aulaService.listarTodasAulas();
  }

  @Get('listarPorModulo/:moduloId')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async listarAulasPorModulo(@Param('moduloId') moduloId: string, @Res() res) {
    try {
      const aulas = await this.aulaService.listarAulasPorModulo(moduloId);
      //console.log('ID do Módulo:', moduloId); 
      console.log('ID do Módulo:', aulas); 
      return res.status(HttpStatus.OK).json(aulas);
        
    } catch (error) {
      // Capturando e registrando quaisquer erros para depuração
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao listar aulas por módulo.' });
    }
  }
 

  @Put(":id")
  async update(@Param("id") aulaId: string, @Body() dto: UpdateAulaDto) {
    return this.aulaService.editarAula(aulaId, dto);
  }

  @Delete(":id")
  async remove(@Param("id") aulaId: string) {
    return this.aulaService.excluirAula(aulaId);
  }
}

/*@Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @UseInterceptors(FileInterceptor('video'))
  async criarAula(@Body() dto: AulaDto, @UploadedFile() videoFile: Express.Multer.File) {

    dto.video = videoFile?.filename;
    return this.aulaService.criarAula(dto);
  }*/
