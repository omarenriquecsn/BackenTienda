import { BadRequestException, Body, Controller, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UserDto } from '../dtos/User.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from 'src/enum/roles.enum';
import { Role } from 'src/decorators/roles/roles.decorator';

@Controller('auth')
@ApiTags('Autenticacion')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @UseGuards(AuthGuard)
  @Post('signin')
  @ApiOperation({ summary: 'Validar usaurio' })
  validateAuth(@Body() credentials: LoginUserDto) {
    return this.authService.validateAuth(credentials);
  }

  @Post('signup')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear Usuario' })
  UserSignUp(@Body() user: UserDto) {
    try {
      return this.authService.UserSignUp(user);
    } catch (err) {
      const validateErr =
        err instanceof Error ? err.message : 'Error desconocido';
      throw new BadRequestException(
        `Error el siguiente error: ${validateErr} al intentar crear el usuario`,
      );
    }
  }

    @UseGuards(AuthGuard, RoleGuard)
    @Role(Roles.Admin)
    @Put(':id')
    UpdateAdmin(@Param('id', ParseUUIDPipe) id: string){
      return this.authService.AdminUpdate(id)
    }
}
