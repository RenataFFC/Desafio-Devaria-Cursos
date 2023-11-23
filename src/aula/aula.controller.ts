// aula.controller.ts

import { Controller, HttpCode, HttpStatus, Post, Body, Param, ParseUUIDPipe, Put, Delete, Get } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { AulaDto } from './dtos/aula.dto';
import { AulaService } from './aula.service';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async criarAula(@Body() dto: AulaDto) {
    return this.aulaService.criarAula(dto);
  }

  @Put('/editar:id')
  @HttpCode(HttpStatus.OK)
  async editarAula(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: AulaDto) {
    console.log('ID recebido no controlador:', id);
  
    return this.aulaService.editarAula(id, dto);
  }

  @Delete(':id/excluir')
  @HttpCode(HttpStatus.NO_CONTENT)
  async excluirAula(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.aulaService.excluirAula(id);
  }

  @Get('listar')
  @HttpCode(HttpStatus.OK)
  async listarTodasAulas() {
    return this.aulaService.listarTodasAulas();
  }
}
