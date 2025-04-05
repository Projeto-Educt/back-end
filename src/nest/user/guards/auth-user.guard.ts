import { makeAuthUser } from '@/modules/user/factories/application/guards/auth-user.factory';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthUser implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    const id = request.session.user.id || undefined;

    const auth = await makeAuthUser();
    const user = await auth.execute({ token, id });

    request.user = { id: user.id };
    return true;
  }
}
