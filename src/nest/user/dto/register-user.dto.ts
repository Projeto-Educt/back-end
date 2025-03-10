import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserRoutesDto {
  @ApiProperty({ example: 'John Doe', description: 'Insira o nome completo' })
  name: string;

  @ApiProperty({ example: 'teste@teste.com' })
  email: string;

  @ApiProperty({
    example: '@Teste123',
    description:
      'Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres',
  })
  password: string;

  @ApiProperty({
    example: '@Teste123',
    description:
      'Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial, um número e ter no mínimo 6 caracteres',
  })
  confirmPassword: string;

  constructor(name: string, email: string, password: string, confirmPassword: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
