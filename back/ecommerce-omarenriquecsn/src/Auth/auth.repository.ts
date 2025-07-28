import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';
import { LoginUserDto } from '../dtos/login-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dtos/User.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {

  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userDbRepository: Repository<User>,
  ) {}
  
  async AdminUpdate(id: string) {
    const userDb: User | undefined = await this.userRepository.getUserById(id);
    if (userDb) {
      await this.userDbRepository.save({...userDb, isAdmin: true})
      return {menssage: `El usuario de ${id} ya es Admin`};
    }
  }

  
  async validateAuth(credenciales: LoginUserDto) {
    const { email, password } = credenciales;
    const user = await this.userRepository.getByEmail(email);

    if (user && user.email == email) {
      const passwordValidate = await bcrypt.compare(password, user?.password);
      if (passwordValidate) {
        const userPaiload = {
          sub: user.id,
          id: user.id,
          email: user.email,
          roles: user.isAdmin,
        };
        const token = this.jwtService.sign(userPaiload);

        return { message: 'Login exitoso', token: token };
      } else {
        throw new BadRequestException('Error Validando Credenciales');
      }
    } else {
      throw new BadRequestException('Credenciales invalidas');
    }
  }

  async UserSignUp(user: UserDto) {
    try {
      const emailValidate = await this.userRepository.getByEmail(user.email);
      if (emailValidate) {
        throw new BadRequestException('El email ya existe en la base de datos');
      }

      if (user.password !== user.confirmPassword) {
        throw new BadRequestException(
          'Las contraseñas ingresadas debe ser iguales',
        );
      }

      const passwordHash: string = await bcrypt.hash(user.password, 10);

      if (!passwordHash) {
        throw new BadRequestException('Fallo al encriptar la contraseña');
      }

      const { password, confirmPassword, ...userNew } = user;

      const newUserDb = this.userDbRepository.create({
        ...userNew,
        password: passwordHash,
      });
      await this.userDbRepository.save(newUserDb);

      return newUserDb
        ? `El usuario fue creado con el Id: ${newUserDb.id}`
        : 'No se creo el usuario';
    } catch (er) {
      throw new BadRequestException(`error: ${er}`);
    }
  }
}
