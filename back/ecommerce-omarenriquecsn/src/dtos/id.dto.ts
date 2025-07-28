import { IsNotEmpty, IsUUID } from 'class-validator';

export class Id {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
