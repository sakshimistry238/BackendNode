import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const categoryModel = app.get(getModelToken(Category.name));

  await categoryModel.insertMany([
    { name: 'Clothing' },
    { name: 'Electronics' },
    { name: 'Books' },
  ]);

  console.log('Categories seeded.');
  await app.close();
}
bootstrap();
