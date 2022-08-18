import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductDocument, ProductModel } from './product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel.name) private productModel: Model<ProductDocument>) {
    }

    async create(productDto: CreateProductDto) {
        return await this.productModel.create(productDto);
    }

    async findById(id: string) {
        return await this.productModel.findById(id);
    }

    async delete(id: string) {
        return await this.productModel.findByIdAndDelete(id);
    }

    async update(id: string, productDto: Partial<CreateProductDto>) {
        return await this.productModel.findByIdAndUpdate(id, productDto);
    }

    async search(search: FindProductDto) {
        return await this.productModel.aggregate([
            {
                $match: {

                },
                $limit: search.limit,
                $addFields: {

                }
            }
        ]);

    }
}
