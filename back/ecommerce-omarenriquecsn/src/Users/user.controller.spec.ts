import { User } from '../entities/user.entity';
import { UsersController } from './users.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { sign, verify } from 'crypto';
import { UserDto } from 'src/dtos/User.dto';

describe('UsersController', () => {
  let controller: UsersController;

  let mockUsersService;

  let mockUsers: User[] = [
    {
      id: '1',
      name: 'omar',
      email: 'omarenriquecs@gmail.com',
      password: 'Omar1234.',
      phone: 21345604,
      address: 'Valencia',
      isAdmin: false,
      orders: [],
    },
    {
      name: 'omar2',
      email: 'omar2enriquecs@gmail.com',
      password: 'Omar21234.',
      phone: 21345604,
      address: 'Valencia',
      isAdmin: false,
      orders: [],
      id: '2'
    },
    {
      id: '3',
      name: 'omar3',
      email: 'omar3enriquecs@gmail.com',
      password: 'Omar31234.',
      phone: 21345604,
      address: 'Valencia',
      isAdmin: false,
      orders: [],
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUsers: jest.fn().mockResolvedValue(mockUsers),
            getUsersById: jest.fn().mockResolvedValue(mockUsers[0]),
            updateUser: jest.fn().mockResolvedValue(mockUsers[0].id),
            deleteUser: jest.fn().mockResolvedValue(mockUsers[0].id)
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canactive: jest.fn().mockReturnValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue('mock-token'),
            verify: jest.fn().mockResolvedValue({userId: 'mock-user-id'})
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    mockUsersService = module.get<UsersService>(UsersService)
  });

  it('controller debe estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('retornar los usuarios', async () => {
    const users = await controller.getUsers();
    expect(users).toEqual(mockUsers);
    expect(mockUsersService.getUsers).toHaveBeenCalledWith();
    
  });

  it('debe retornar un usuario', async () => {
    const oneUser = await controller.getUserById('1');
    expect(oneUser).toEqual(mockUsers[0]);
    expect(mockUsersService.getUsersById).toHaveBeenCalledWith('1');
  });

  it('debe actualizar el usuario', async () => {
    const newProfile: UserDto = {
      email: 'omarenriquecs@gmail.com',
      name: 'omar',
      password: 'Omar1234.',
      confirmPassword: '',
      address: 'Caracas',
      phone: 21345604
    }
    const userUpdate = await controller.updateUser('1', newProfile)
    
    expect(userUpdate).toEqual('1')
    expect(mockUsersService.updateUser).toHaveBeenCalledWith('1', newProfile);

  })

  it('debe eliminar un usuario', async () => {
    const deletUser = await controller.deleteUser('1');
    expect(deletUser).toEqual('1');
    expect(mockUsersService.deleteUser).toHaveBeenCalledWith('1');
  })
});
