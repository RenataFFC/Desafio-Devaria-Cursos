import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import {APP_GUARD} from '@nestjs/core'
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { ModulosModule } from './modulos/modulos.module';
import { AulaModule } from './aula/aula.module';
import { UploadModule } from './upload/upload.module';



@Module({ 
 imports:[ 
  ConfigModule.forRoot(),  
  MongooseModule.forRoot(process.env.DATABASE_URL),  
  AuthModule,
  UserModule,
  ModulosModule,
  AulaModule,
  UploadModule,
 ], 
 controllers: [], 
 providers: [{provide: APP_GUARD, useClass:JwtAuthGuard},
 ],
})
export class AppModule {}