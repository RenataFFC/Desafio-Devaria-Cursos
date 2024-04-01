import {Injectable, ExecutionContext, Logger, UnauthorizedException} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard} from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/ispublic.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){
    private readonly logger = new Logger(JwtAuthGuard.name);

    constructor(private reflector: Reflector){
        super();
    }

    canActivate(context: ExecutionContext){
        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,[context.getHandler(), context.getClass()]
        );

        if(isPublic){
            this.logger.debug('Rota marcada como pública. Permitindo acesso sem autenticação.');
            return true;
        }
   
       const canActivate = super.canActivate(context);

        if(typeof canActivate === 'boolean'){
            return canActivate;
        }

        const canActivatePromise = canActivate as Promise<boolean>;

        return canActivatePromise.catch(error => {
             this.logger.error(`Erro ao verificar autenticação: ${error.message}`);
                throw new UnauthorizedException();
                       
        });
    }
}