import { Body, Controller, Delete, Param, Post, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CreateReviewDto } from './create-reciew.dto';
import { ReviewModel } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {

	constructor(private reviewService: ReviewService) { }

	@Post()
	async create(@Body() dto: CreateReviewDto) {
		return await this.reviewService.create(dto);
	}

	@Delete(':id')
	async get(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);

		if (deletedDoc) {
			return deletedDoc;
		}
		else {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('product/:id')
	async getByProduct(@Param('id') id: string) {
		return await this.reviewService.findByProductId(id);
	}

	@Delete('product/:id')
	async deleteByProduct(@Param('id') id: string) {
		const deletedDocCount = await this.reviewService.deleteByProductId(id);

		if (deletedDocCount) {
			return { deletedAmount: deletedDocCount };
		}
		else {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
