import { EDUCATION_LEVEL, INTEREST_COURSES, INTEREST_UNIVERSITIES } from '@/modules/user/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoutesDto {
  @ApiProperty({ example: 'John Doe', description: 'Insira o nome completo', required: false })
  name?: string;

  @ApiProperty({ example: 'teste@teste.com', required: false })
  email?: string;

  @ApiProperty({
    example: EDUCATION_LEVEL[0],
    description: 'Nível de Ensino: ' + EDUCATION_LEVEL.join(', '),
    required: false,
  })
  educationLevel?: string;

  @ApiProperty({
    example: INTEREST_COURSES[0],
    description: 'Cursos de interesse: ' + INTEREST_COURSES.join(', '),
    required: false,
  })
  interestCourse?: string;

  @ApiProperty({
    example: INTEREST_UNIVERSITIES[0],
    description: 'Faculdades de interesse: ' + INTEREST_UNIVERSITIES.join(', '),
    required: false,
  })
  interestUniversity?: string;
  constructor(
    name?: string,
    email?: string,
    educationLevel?: string,
    interestCourse?: string,
    interestUniversity?: string,
  ) {
    this.name = name;
    this.email = email;
    this.educationLevel = educationLevel;
    this.interestCourse = interestCourse;
    this.interestUniversity = interestUniversity;
  }
}
