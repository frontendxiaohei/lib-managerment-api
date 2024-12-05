import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 参数校验管道
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 转为dto实例类型
  }))


  app.enableCors({
    origin: true,
    credentials: true,
  });

  // app.useStaticAssets('uploads');

  

  await app.listen(3000);
}
bootstrap();
