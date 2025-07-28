import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Id } from './id.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    description: 'Debe ser un id de un usuario registrado',
    example: '3605c436-e7e1-4d84-a6d0-dc8c8ef48474'
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    required: true,
    description: 'Debe ser un array con productos',
    example: [
      {
        "id": "87185466-e656-4210-a2d4-9da16a92a23e"
      },
       {
        "id": "59fee081-3780-4ad5-aa0f-d39c1f333e19"
      }
    ]
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsNotEmpty()
  products: Array<Id>;
}
