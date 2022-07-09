import { Body, Controller, Delete, Param, Post, Get, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './create-review.dto';
import { ReviewService } from './review.service';
import { NOT_FOUND } from './review.constants';


@Controller('review')
export class ReviewController {

	constructor(private reviewService: ReviewService) { }

	@Post()
	@UsePipes(new ValidationPipe())
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
		console.log(deletedDocCount);
		if (deletedDocCount) {
			return { deletedAmount: deletedDocCount };
		}
		else {
			throw new HttpException(NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
