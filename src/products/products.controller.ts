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
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { RESPONSE_MESSAGES } from 'src/common/constants/response.constant';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoryService: CategoriesService,
  ) {}

  @Post('create')
  @ResponseMessage(RESPONSE_MESSAGES.RECORD_INSERTED)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Post('list')
  @ResponseMessage(RESPONSE_MESSAGES.RECORD_LISTED)
  findAll(@Body() list: ListDto) {
    return this.productsService.findAll(list);
  }

  @Get(':id')
  @ResponseMessage(RESPONSE_MESSAGES.SUCCESS)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage(RESPONSE_MESSAGES.RECORD_UPDATED)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ResponseMessage(RESPONSE_MESSAGES.RECORD_DELETED)
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
  @Get('/category/list')
  @ResponseMessage(RESPONSE_MESSAGES.SUCCESS)
  getAllCategories() {
    return this.categoryService.getCategoryList();
  }
}
