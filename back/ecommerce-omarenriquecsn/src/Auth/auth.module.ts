import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { UsersModule } from '../Users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from 'src/Users/users.repository';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, AuthRepository, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
