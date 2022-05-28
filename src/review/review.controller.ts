import { Body, Controller, Delete, Param, Post, Get } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
	@Post()
	async create(@Body() dto: Omit<ReviewModel, '_id'>) { }

	@Delete(':id')
	async get(@Param('id') id: string) { }

	@Get('product/:id')
	async getByProduct(@Param('id') id: string) { }
}
