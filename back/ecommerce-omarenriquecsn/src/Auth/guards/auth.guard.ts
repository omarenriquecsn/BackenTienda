import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization']?.split(' ')[1];

    if (!authHeader) {
      throw new UnauthorizedException('Error el token no existe');
    }
    const secret = process.env.JWT_SECRET;
    try {
      const user = await this.jwtService.verifyAsync(authHeader, { secret });
      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);
      
      if (user.roles) {
        user.roles = ['administrador'];
      } else {
        user.roles = ['user'];
      }
      request.user = user;

      return true;
    } catch (err) {
      const validateErr =
        err instanceof Error ? err.message : 'Error desconocido';
      throw new UnauthorizedException('Token invalido', validateErr);
    }
  }
}
