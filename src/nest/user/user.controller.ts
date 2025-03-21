import { makeNestRouter } from '@/main/factories/infra/make-nest-router.factory';
import {
  makeActiveUserController,
  makeRegisterUserController,
  makeResendRegisterUserEmailController,
} from '@/modules/user/factories/application/controllers';
import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { RegisterUserRoutesDto, ResendRegisterUserEmailRoutesDto } from './dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Post()
  @ApiOperation({
    summary: 'Registra um novo usuário',
    description: 'Cadastra informações referente ao novo estudante',
  })
  @ApiBody({ type: RegisterUserRoutesDto })
  @ApiQuery({ name: 'callbackUrl', required: true })
  @ApiResponse({ status: 204, description: 'Sucesso: Usuário Cadastrado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 409, description: 'Conflict: Email ja cadastrado' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(@Req() req: Request, @Res() res: Response) {
    const adapterNest = makeNestRouter(await makeRegisterUserController());
    await adapterNest.adapt(req, res);
  }

  @Post('/resend-register-email')
  @ApiOperation({
    summary: 'Re-envia o email de confirmação do cadastro',
  })
  @ApiBody({ type: ResendRegisterUserEmailRoutesDto })
  @ApiQuery({ name: 'callbackUrl', required: true })
  @ApiResponse({ status: 204, description: 'Sucesso: Email reenviado' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async resendEmail(@Req() req: Request, @Res() res: Response) {
    const adapterNest = makeNestRouter(await makeResendRegisterUserEmailController());
    await adapterNest.adapt(req, res);
  }

  @Get('/activate')
  @ApiOperation({
    summary: 'Ativa um usuário através do token de ativação',
  })
  @ApiQuery({
    name: 'token',
    required: true,
    description: 'Token de ativação enviado no email',
  })
  @ApiResponse({ status: 302, description: 'Sucesso: Redireciona para a url enviada no cadastro' })
  @ApiResponse({ status: 400, description: 'Bad Request: Requisição inválida' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async activate(@Req() req: Request, @Res() res: Response) {
    const adapterNest = makeNestRouter(await makeActiveUserController());
    await adapterNest.adapt(req, res);
  }
}
