import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserDto } from '../dtos/User.dto';

@Injectable()
export class AuthService {
  AdminUpdate(id: string) {
    return this.authRepository.AdminUpdate(id)
  }
  constructor(private authRepository: AuthRepository) {}

  validateAuth(credentials: LoginUserDto) {
    return this.authRepository.validateAuth(credentials);
  }

  UserSignUp(user: UserDto) {
    return this.authRepository.UserSignUp(user);
  }
}
