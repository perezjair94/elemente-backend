import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // enable cors for this app
  app.useWebSocketAdapter(new WsAdapter(app)); // enable ws for this app
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
