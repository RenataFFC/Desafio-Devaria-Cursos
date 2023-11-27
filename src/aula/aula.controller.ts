import { Controller, HttpCode, HttpStatus, Post, Body, Param, Request, ParseUUIDPipe, Put, Delete, Get } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { AulaDto } from './dtos/aula.dto';
import { AulaService } from './aula.service';
import { UpdateAulaDto } from './dtos/updateaula.dto';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()

  
  async criarAula(@Body() dto: AulaDto) {
    return this.aulaService.criarAula(dto);
  }

  @Put(':id') 
  async update(@Param('id') aulaId: string, @Body() dto: UpdateAulaDto) { // Update parameter type
      return this.aulaService.editarAula(aulaId, dto); // Updated method name
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
