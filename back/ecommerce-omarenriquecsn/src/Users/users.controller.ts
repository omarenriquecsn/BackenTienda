import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  // HttpException,
  // HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  // Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { UserDto } from '../dtos/User.dto';
import { User } from '../entities/user.entity';
import { RoleGuard } from '../Auth/guards/role.guard';
import { Role } from '../decorators/roles/roles.decorator';
import { Roles } from '../enum/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/users')
@ApiTags('Usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener Usuarios'})
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Roles.Admin)
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener Usuarios Paginados'})
  @UseGuards(AuthGuard, RoleGuard)
  @Role(Roles.Admin)
  @Get('list')
  getUserLimit(@Query('limit') limit: number, @Query('page') page: number) {
    return this.usersService.getUsersLimit(
      !limit ? 5 : limit,
      !page ? 1 : page,
    );
  }
  
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Obtener Usuario Por Id'})
  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User | undefined> {
    const user = await this.usersService.getUsersById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  // @HttpCode(201)
  // @Post()
  // async addUser(@Body() user: UserDto): Promise<string> {
  //   try {
  //     const idUser = await this.usersService.addUser(user);
  //     if (!idUser) {
  //       throw new Error('Usuario no Creado');
  //     }
  //     return idUser;
  //   } catch (er) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.NOT_ACCEPTABLE,
  //         error: `Usuario no creado error: ${er}`,
  //       },
  //       HttpStatus.I_AM_A_TEAPOT,
  //     );
  //   }
  // }


  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Actualizar Usuario'})
  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() value: Partial<User>,
  ): Promise<string | undefined> {
    return this.usersService.updateUser(id, value);
  }

  @HttpCode(200)
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({summary: 'Eliminar Usuario'})
  @Delete(':id')
  deleteUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string | undefined> {
    return this.usersService.deleteUser(id);
  }

}
