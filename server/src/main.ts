import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'digital-envelope.dev', 'http://www.digitalenvlope.xyz']
  });
  app.setGlobalPrefix("api")
  const conf = app.get<ConfigService>(ConfigService)
  await app.listen(conf.get('PORT') || 3000);
}
bootstrap();
