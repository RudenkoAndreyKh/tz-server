import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/tz`, { useNewUrlParser: true });

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
