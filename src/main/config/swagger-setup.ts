import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication<any>, path: string = ''): void => {
  const config = new DocumentBuilder()
    .setTitle('Educt API')
    .setVersion('v-1')
    .addBearerAuth({
      type: 'http',
      description: 'Use o `token` adquirido ao acessar a conta',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
};
