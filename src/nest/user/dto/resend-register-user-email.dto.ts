import { ApiProperty } from '@nestjs/swagger';

export class ResendRegisterUserEmailRoutesDto {
  @ApiProperty({ example: 'teste@teste.com' })
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
