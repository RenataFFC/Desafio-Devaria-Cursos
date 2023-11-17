// modulos.controller.ts

import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { ModulosDto } from './dtos/modulos.dto';
import { ModulosService } from './modulos.service'; // Importe o serviço

@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  register(@Body() dto: ModulosDto) {
    return this.modulosService.modulos(dto);
  }
}
