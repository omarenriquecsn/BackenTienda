import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/Users/users.service';
import { UsersRepository } from '../src/Users/users.repository';
import { User } from '../src/entities/user.entity';
import { INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '../src/app.module';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { UserDto } from '../src/dtos/User.dto';

describe('App (e2e)', () => {
  let mockUserRepository: Partial<UsersRepository>;

  let app: INestApplication;

  let jwtServise: JwtService;

  let user: User = {
    id: '1',
    name: 'omar',
    email: 'omarenriquecs5@gmail.com',
    password: 'Omar1234.',
    phone: 123456789,
    address: 'Valencia',
    isAdmin: false,
    orders: [],
  };

  beforeEach(async () => {
    mockUserRepository = {
      getByEmail: jest.fn().mockResolvedValue(user),
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUserRepository)
      .compile();

    app = module.createNestApplication();
    await app.init();
    jwtServise = module.get<JwtService>(JwtService);
    jest.spyOn(bcrypt, 'compare').mockImplementation((password, hash) => {
      return Promise.resolve(password === 'Omar1234.');
    });
  });

  it('deberia autenticar el usuario y retornar un token', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'omarenriquecs5@gmail.com',
        password: 'Omar1234.',
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
