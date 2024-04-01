import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Get,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { IsPublic } from "src/auth/decorators/ispublic.decorator";
import { ModulosDto } from "./dtos/modulos.dto";
import { ModulosService } from "./modulos.service";
import { UpdateModulosDto } from "./dtos/updatemodulos.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("modulos")
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  register(@Body() dto: ModulosDto) {
    console.log(dto);
    return this.modulosService.criarModulo(dto);
  }

  @Put(":id")
  async update(@Param("id") moduloId: string, @Body() dto: UpdateModulosDto) {
    return this.modulosService.editarModulo(moduloId, dto);
  }

  @Delete(":id") // Rota para excluir um módulo
  async remove(@Param("id") moduloId: string) {
    return this.modulosService.excluirModulo(moduloId);
  }

  @Get('listar')
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async listarTodosModulos() {
    return this.modulosService.listarTodosModulos();
  }
  

  
  @Get(":moduloId/aulas")
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  async listarAulasDoModulo(@Param("moduloId") moduloId: string) {
    return this.modulosService.listarAulasDoModulo(moduloId);
  }
}
