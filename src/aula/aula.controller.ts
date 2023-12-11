import { Controller, HttpCode, HttpStatus, Post,Put, Body, Param, Delete, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { AulaDto } from './dtos/aula.dto';
import { AulaService } from './aula.service';
import { UpdateAulaDto } from './dtos/updateaula.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @UseInterceptors(FileInterceptor('video'))
  async criarAula(@Body() dto: AulaDto, @UploadedFile() videoFile: Express.Multer.File) {

    dto.video = videoFile;
    return this.aulaService.criarAula(dto);
  }

  @Put(':id') 
  async update(@Param('id') aulaId: string, @Body() dto: UpdateAulaDto) {
    return this.aulaService.editarAula(aulaId, dto);
  }

  @Delete(':id')
  async remove(@Param('id') aulaId: string) {
    return this.aulaService.excluirAula(aulaId);
  }

  @Get('listar')
  @HttpCode(HttpStatus.OK)
  async listarTodasAulas() {
    return this.aulaService.listarTodasAulas();
  }
}
