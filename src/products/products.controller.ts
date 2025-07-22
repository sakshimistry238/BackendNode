import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ListDto } from './dto/list.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService,private readonly categoryService: CategoriesService) {}

  @Post("create")
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Post("list")
  findAll(@Body() list: ListDto) {
    return this.productsService.findAll(list);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  @Get("/category/list")
  getAllCategories() {
    return this.categoryService.getCategoryList();
  }
}
