import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/User.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  getUsersById(id: string): Promise<User | undefined> {
    return this.userRepository.getUserById(id);
  }

  getUsersLimit(limit: number, page: number) {
    return this.userRepository.getUsersLimit(limit, page);
  }

  // addUser(User: UserDto): Promise<string> {
  //   return this.userRepository.addUser(User);
  // }

  updateUser(id: string, value: Partial<User>): Promise<string | undefined> {
    return this.userRepository.updateUser(id, value);
  }

  deleteUser(id: string): Promise<string | undefined> {
    return this.userRepository.deleteUser(id);
  }
}
