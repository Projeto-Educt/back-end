import { makeNestRouter } from '@/main/factories/infra/make-nest-router.factory';
import { makeRegisterStudentController } from '@/modules/student/factories/application/controllers/register-student.factory';
import { Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RegisterStudentRoutesDto } from './dto';

@Controller('student')
export class StudentController {
  @Post()
  @ApiOperation({
    summary: 'Registra um novo estudante',
    description: 'Cadastra informações referente ao novo estudante',
  })
  @ApiBody({ type: RegisterStudentRoutesDto })
  @ApiQuery({ name: 'callbackUrl', required: true })
  @ApiResponse({ status: 204, description: 'Sucesso: Estudante Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 409, description: 'Conflict: Email ja cadastrado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(@Req() req: Request, @Res() res: Response) {
    const adapterNest = makeNestRouter(await makeRegisterStudentController());
    await adapterNest.adapt(req, res);
  }
}
