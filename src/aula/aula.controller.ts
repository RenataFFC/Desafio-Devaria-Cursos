// aula.controller.ts

import { Controller, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/ispublic.decorator';
import { AulaDto } from './dtos/aula.dto'; // Certifique-se de que você tenha um DTO AulaDto
import { AulaService } from './aula.service';

@Controller('aula')
export class AulaController {
  constructor(private readonly aulaService: AulaService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  register(@Body() dto: AulaDto) {
    return this.aulaService.aula(dto);
  }
}
