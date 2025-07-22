import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './entities/product.entity';
import mongoose, { Model, Types } from 'mongoose';
import { TypeExceptions } from 'src/common/helpers/exceptions';
import { ListDto } from './dto/list.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existing = await this.productModel.findOne({
      name: createProductDto.name,
    });
    if (existing) {
      throw TypeExceptions.ProductAlreadyExists();
    }
    const createdProduct = new this.productModel({
      ...createProductDto,
      categories: new mongoose.Types.ObjectId(createProductDto.categories),
    });
    return createdProduct.save();
  }

  // src/products/products.service.ts
  async findAll(query: ListDto): Promise<any> {
    try {
      let {
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        search = '',
        categoryIds,
      } = query;
      // Default fallback to prevent empty string issue
      sortBy = sortBy?.trim() || 'createdAt';
      const skip = (page - 1) * limit;
      const sortDirection = sortOrder === 'asc' ? 1 : -1;

      const aggregationQuery: any[] = [];
      if (categoryIds && categoryIds.length > 0) {
        aggregationQuery.push({
          $match: {
            categories: {
              $in: categoryIds.map((id) => new Types.ObjectId(id)),
            },
          },
        });
      }
      // 🔍 Search filter (by name or description)
      if (search) {
        aggregationQuery.push({
          $match: {
            $or: [
              { name: { $regex: search, $options: 'i' } },
              { description: { $regex: search, $options: 'i' } },
            ],
          },
        });
      }

      // 📦 Join with categories (optional but useful)
      aggregationQuery.push({
        $lookup: {
          from: 'categories',
          localField: 'categories',
          foreignField: '_id',
          as: 'categories',
        },
      });
      aggregationQuery.push({
        $unwind: {
          path: '$categories',
          preserveNullAndEmptyArrays: true,
        },
      });
      aggregationQuery.push({
        $facet: {
          metadata: [{ $count: 'total' }],
          data: [
            { $sort: { [sortBy]: sortDirection } },
            { $skip: skip },
            { $limit: limit },
          ],
        },
      });

      aggregationQuery.push({
        $unwind: {
          path: '$metadata',
          preserveNullAndEmptyArrays: true,
        },
      });

      aggregationQuery.push({
        $project: {
          total: '$metadata.total',
          data: 1,
        },
      });

      const result = await this.productModel.aggregate(aggregationQuery).exec();
      return result[0] || { total: 0, data: [] };
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw TypeExceptions.ProductNotFound();
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw TypeExceptions.ProductNotFound();
      }
      const updated = await this.productModel
        .findByIdAndUpdate(
          id,
          {
            ...updateProductDto,
            categories: new mongoose.Types.ObjectId(
              updateProductDto.categories,
            ),
          },
          {
            new: true,
          },
        )
        // .populate('categories', 'name') // Populate after update
        .exec();
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw TypeExceptions.ProductNotFound();
      }
      await this.productModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
