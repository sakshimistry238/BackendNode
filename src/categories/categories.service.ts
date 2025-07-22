import { Injectable } from '@nestjs/common';
import { Category, CategoryDocument } from './entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async insertCategory() {
    try {
      await this.categoryModel.insertMany([
        { name: 'Clothing' },
        { name: 'Electronics' },
        { name: 'Books' },
        { name: 'Fashion' },
        { name: 'Kitchen' },
        { name: 'Decorations' },
        { name: 'Kids' },
        { name: 'Toys' },
        { name: 'Make Up' },
      ]);
    } catch (error) {}
  }

  async getCategoryList() {
    try {
      return await this.categoryModel.find();
    } catch (error) {}
  }
}
