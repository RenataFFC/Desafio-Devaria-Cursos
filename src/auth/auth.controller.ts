import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
@Controller("auth")
export class AuthController {
constructor(private readonly service: AuthService) { }
@Post('login')
@HttpCode(HttpStatus.OK)
login(@Body() dto: LoginDto) {
return this.service.login(dto);
}
}



/*import {Controller, Post, HttpCode, HttpStatus, Body} from '@nestjs/common'
//import { RegisterDto } from 'src/user/dtos/register.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/ispublic.decorator';
import { LoginDto } from './dtos/login.dto';

@Controller("auth")
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    login(@Body() dto: LoginDto){
        return this.authService.login(dto);
    }

    // REGISTER NÃO FICA MELHOR NA CAMADA DE USER?
    @Post('register')
    @HttpCode(HttpStatus.OK)
    @IsPublic()
    register(@Body() dto: ){
        return this.authService.register(dto);
    }
}*/