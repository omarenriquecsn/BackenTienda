import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({
    required: true,
    description: 'Debe ser un email valido',
    example: 'omarenriquecs@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    required: true,
    description: 'Debe ser un nombre de almenos tres cararteres',
    example: 'Omar Contereas',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  readonly name: string;

  @ApiProperty({
    required: true,
    description: 'Debe ser un password mayor a 8 caracteres valido',
    example: 'Omar1234!',
  })
  @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
    message:
      'Solo puede ingresar los siguientes caracteres especiales: !@#$%^&*, Debe incluir una Mayuscula una minuscula',
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
  readonly password: string;

  @ApiProperty({
    required: true,
    description: 'Debe ser un password mayor a 8 caracteres valido',
    example: 'Omar1234!',
  })
  @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
    message:
      'Solo puede ingresar los siguientes caracteres especiales: !@#$%^&*, Debe incluir una Mayuscula una minuscula',
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
  readonly confirmPassword: string;

  @IsEmpty()
  @IsOptional()
  @IsBoolean()
  readonly isAdmin?: boolean;

  @ApiProperty({
    required: true,
    description: 'Debe ser una direccion',
    example: 'Calle 1 casa 2',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  readonly address: string;

  @ApiProperty({
    required: true,
    description: 'Debe ser un celular valido',
    example: '412507225',
  })
  @IsNotEmpty()
  @IsNumber()
  @Max(2000000000)
  readonly phone: number;

  @ApiProperty({
    required: true,
    description: 'Debe ser una pais',
    example: 'Venezuela',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly country?: string | undefined;

  @ApiProperty({
    required: true,
    description: 'Debe ser una direccion',
    example: 'Valencia',
  })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  readonly city?: string | undefined;
}
