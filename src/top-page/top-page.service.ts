import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ProductModel } from "src/product/product.model";
import { CreateTopPageDto } from "./dto/create-top-page.dto";
import { FindTopPageDto } from "./dto/find-top-page.dto";
import { TopPageDocument, TopPageModel } from "./top-page.model";

@Injectable()
export class TopPageService {
    constructor(
        @InjectModel(TopPageModel.name) private topPageModel: Model<TopPageDocument>
    ) { }

    create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto);
    }

    delete(id: string) {
        return this.topPageModel.findByIdAndDelete(id);
    }

    getByCategory(id: number) {
        return this.topPageModel.aggregate()
            .match({
                firstCategory: id
            })
            .group({
                _id: { secondCategory: '$secondCategory' },
                pages: { $push: { alias: '$alias', title: '$title' } }
            });

    }

    getOne(id: string) {
        return this.topPageModel.findById(id);
    }

    update(id: string, dto: TopPageModel) {
        return this.topPageModel.findByIdAndUpdate(id, dto);
    }

    // select dto's with products by tags and by category
    async search(dto: FindTopPageDto) {
        return await this.topPageModel.aggregate([
            {
                $match: {
                    firstCategory: dto.firstCategory
                }
            },
            {
                $sort: {
                    title: 1
                }
            },
            {
                $lookup: {
                    from: 'productmodels',
                    localField: 'tags',
                    foreignField: 'tags',
                    as: 'products'
                }
            },
            {
                $addFields: {
                    productsCount: {
                        $size: '$products'
                    },
                    // products: {
                    //     $function: `function (products) {
                    //         return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    //     }`,
                    //     args: ['$products'],
                    //     lang: 'js'
                    // }
                }
            }
        ]) as (TopPageModel & { productsCount: number, products: ProductModel[]; })[];
    }

    async searchByText(searchText: string) {
        return await this.topPageModel.find({
            $text: {
                $search: searchText,
                $caseSensitive: false,
                $diacriticSensitive: false
            }
        });
    }
}