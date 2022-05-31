import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './create-reciew.dto';
import { ReviewDocument, ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>) { }

    async create(dto: CreateReviewDto): Promise<ReviewDocument> {
        return await this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<ReviewDocument | null> {
        return await this.reviewModel.findByIdAndDelete(id);
    }

    async findByProductId(id: string): Promise<ReviewDocument[]> {
        return await this.reviewModel.find({
            productId: id
        })
    }

}
