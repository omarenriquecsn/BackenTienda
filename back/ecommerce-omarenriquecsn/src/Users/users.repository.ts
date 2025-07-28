import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../dtos/User.dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) public userRepository: Repository<User>,
  ) {}

  // public allUsers: UserDto[] = [
  //   {
  //     email: 'juan.perez@example.com',
  //     name: 'Juan Pérez',
  //     password: 'password123',
  //     address: 'Calle 123, Caracas',
  //     phone: 4121234567,
  //     country: 'Venezuela',
  //     city: 'Caracas',
  //   },
  //   {
  //     email: 'maria.garcia@example.com',
  //     name: 'María García',
  //     password: 'securepass456',
  //     address: 'Av. Bolivar, Valencia',
  //     phone: 4129876543,
  //     country: 'Venezuela',
  //     city: 'Valencia',
  //   },
  //   {
  //     email: 'carlos.lopez@example.com',
  //     name: 'Carlos López',
  //     password: 'qwerty789',
  //     address: 'Calle Sucre, Maracay',
  //     phone: 4127654321,
  //     country: 'Venezuela',
  //     city: 'Maracay',
  //   },
  //   {
  //     email: 'ana.rodriguez@example.com',
  //     name: 'Ana Rodríguez',
  //     password: 'abc123xyz',
  //     address: 'Urbanización La Viña, Valencia',
  //     phone: 4121112222,
  //   },
  //   {
  //     email: 'luis.martinez@example.com',
  //     name: 'Luis Martínez',
  //     password: 'pass321',
  //     address: 'Calle Miranda, Puerto La Cruz',
  //     phone: 4129998888,
  //     country: 'Venezuela',
  //   },
  //   {
  //     email: 'rosa.fernandez@example.com',
  //     name: 'Rosa Fernández',
  //     password: 'rosa789pass',
  //     address: 'Av. Principal, Barquisimeto',
  //     phone: 4126667777,
  //     city: 'Barquisimeto',
  //   },
  //   {
  //     email: 'pedro.sanchez@example.com',
  //     name: 'Pedro Sánchez',
  //     password: 'passwordPedro',
  //     address: 'Calle Bolívar, Mérida',
  //     phone: 4121113333,
  //     country: 'Venezuela',
  //     city: 'Mérida',
  //   },
  //   {
  //     email: 'sofia.morales@example.com',
  //     name: 'Sofía Morales',
  //     password: 'sofiaSecure',
  //     address: 'Urbanización San Luis, Maracaibo',
  //     phone: 4124445555,
  //   },
  //   {
  //     email: 'diego.gomez@example.com',
  //     name: 'Diego Gómez',
  //     password: 'diego12345',
  //     address: 'Avenida Ppal, Caracas',
  //     phone: 4121114444,
  //     country: 'Venezuela',
  //     city: 'Caracas',
  //   },
  //   {
  //     email: 'paula.soto@example.com',
  //     name: 'Paula Soto',
  //     password: 'paulaBest',
  //     address: 'Calle Zamora, Valencia',
  //     phone: 4121115555,
  //     city: 'Valencia',
  //   },
  // ];

  async getUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.find({
      relations: { orders: true },
      select: ['id', 'name', 'email', 'address', 'city', 'phone', 'country'],
    });
    return users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const oneUser: User | null = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
      select: ['id', 'name', 'email', 'address', 'city', 'phone', 'country'],
    });
    if (oneUser) {
      return oneUser;
    }
    throw new BadRequestException('Usuario No encontrado');
  }

  async getUsersLimit(limit: number, page: number): Promise<User[]> {
    const [data] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      select: ['id', 'name', 'email', 'address', 'city', 'phone', 'country'],
      relations: { orders: true },
    });
    return data;
  }

  // async addUser(user: UserDto) {
  //   try {
  //     const password: string = await bcrypt.hash(user.password, 10);
  //     const newUserDb = this.userRepository.create({
  //       ...user,
  //       password: password,
  //     });
  //     await this.userRepository.save(newUserDb);

  //     return newUserDb ? newUserDb.id : 'No se creo el usuario';
  //   } catch (er) {
  //     throw new BadRequestException(`error: ${er}`);
  //   }
  // }

  async updateUser(id: string, value: Partial<User>): Promise<string | undefined> {
    const userDb: User | undefined = await this.getUserById(id);
    if (userDb) {
      await this.userRepository.save({...userDb, ...value})
      return userDb.id;
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const removeUser: User | undefined = await this.getUserById(id);
      if (removeUser) {
        await this.userRepository
          .createQueryBuilder()
          .delete()
          .from(User)
          .where({ id })
          .execute();
        return id;
      }
      throw new Error('Error Usuario no encontrado');
    } catch (err) {
      const errorValidate =
        err instanceof Error ? err.message : 'Error desconocido';
      return `Error: ${errorValidate}`;
    }
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const user: User | null = await this.userRepository.findOne({
      where: { email },
    });
    return user ? user : undefined;
  }
}
