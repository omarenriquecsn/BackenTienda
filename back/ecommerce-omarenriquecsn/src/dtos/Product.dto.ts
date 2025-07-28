import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Category } from '../entities/Categories.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    required: true,
    description: 'Debe ser el nombre del producto',
    example: 'Computador Portatil'
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

   @ApiProperty({
    required: true,
    description: 'Debe ser una descripcion del producto',
    example: 'Computador Portatil marca lenovo de 15 pulgadas'
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    required: true,
    description: 'Debe ser el precio por unidad del producto',
    example: 198.00
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    required: true,
    description: 'Debe ser la cantidad disponible',
    example: 100
  })
  @IsNotEmpty()
  @IsNumber()
  readonly stock: number;

  @ApiProperty({
    required: false,
    description: 'Debe ser una URL de una imagen',
    example: 'https://images.app.goo.gl/UhFunkAC491ScWAJ8'
  })
  @IsNotEmpty()
  @IsString()
  readonly imgUrl: string;

 
  @IsString()
  @IsOptional()
  category: Category;
}
