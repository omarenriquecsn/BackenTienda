import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
    description: 'Debe ser un email valido',
    example: 'maria.garcia@exaplen.com'
  })
  email: string;


  
  @ApiProperty({
    required: true,
    description: 'Debe ser la contraseña de registro',
    example: 'Secure4.e'
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1,
    minNumbers: 1,
  })
  password: string;
}
