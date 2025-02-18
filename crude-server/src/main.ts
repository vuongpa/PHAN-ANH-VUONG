import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  const version = configService.get<string>('VERSION', 'v1');

  app.setGlobalPrefix(`api/${version}`);

  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(
    '/swagger',
    basicAuth({
      challenge: true,
      users: {
        admin: configService.get<string>('SWAGGER_PASSWORD', 'admin'),
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Products example')
    .setDescription('The products API description')
    .setVersion(version)
    .addTag('products')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  await app.listen(port);
}
bootstrap();
