import { Controller, HttpCode, HttpStatus, Post, Body, Param, Put, Delete, Request, Get} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ModulosDto } from './dtos/modulos.dto';
import { ModulosService } from './modulos.service'; 
import { UpdateModulosDto } from './dtos/updatemodulos.dto';

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  register(@Body() dto: ModulosDto) {
    return this.modulosService.modulos(dto);
  }
  @Put(':id') // Rota para editar um módulo
  async update(@Param('id') moduloId: string, @Body() dto: UpdateModulosDto) {
    return this.modulosService.editarModulo(moduloId, dto);
  }
 
  @Delete(':id') // Rota para excluir um módulo
  async remove(@Param('id') moduloId: string) {
    return this.modulosService.excluirModulo(moduloId);
  }

  
  @Get('listar')
  @HttpCode(HttpStatus.OK)
  async listarTodosModulos() {
    return this.modulosService.listarTodosModulos();
  }
}
