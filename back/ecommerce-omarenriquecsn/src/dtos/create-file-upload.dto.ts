import { IsEmpty, IsNotEmpty, IsUUID } from 'class-validator';
import { Id } from './id.dto';
import { ApiBody, ApiProperty } from '@nestjs/swagger';

export class CreateFileUploadDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
    description: 'Imagen en formato JPG, PNG o WEBP',
  })
  file: any;
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    description: 'Debe ser el id de un producto para agregar una imagen',
    example: '1d6a3281-fe75-4ae7-a14f-81f48f400854'
  })
  productId: Id;
}
