import { Module } from '@nestjs/common';
import { StudentModule } from './user/user.module';

@Module({
  imports: [StudentModule],
})
export class AppModule {}
