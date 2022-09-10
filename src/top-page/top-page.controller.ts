import {
	Controller,
	Post,
	Get,
	Patch,
	Param,
	HttpCode,
	Body,
	Delete,
	NotFoundException,
	UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {

	constructor(
		private readonly topPageService: TopPageService
	) { }

	@Post()
	async create(@Body() dto: CreateTopPageDto) {
		return await this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const foundTopPage = await this.topPageService.getOne(id);

		if (!foundTopPage) {
			throw new NotFoundException();
		}

		return foundTopPage;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedTopPage = await this.topPageService.delete(id);

		if (!deletedTopPage) {
			throw new NotFoundException();
		}

		return deletedTopPage;
	}

	@Patch(':id')
	async update(@Param('id', IdValidationPipe) id: string, @Body() dto: TopPageModel) {
		const updatedTopPage = await this.topPageService.update(id, dto);

		if (!updatedTopPage) {
			throw new NotFoundException();
		}

		return updatedTopPage;
	}

	@HttpCode(200)
	@Post('search')
	@UsePipes(new ValidationPipe())
	async search(@Body() dto: FindTopPageDto) {
		return await this.topPageService.search(dto);
	}
}
