import {
	Controller,
	Post,
	Get,
	Patch,
	Param,
	HttpCode,
	Body,
	Delete,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';

@Controller('top-page')
export class TopPageController {
	@Post()
	async create(@Body() dto: Omit<TopPageModel, '_id'>) {
		return null;
	}

	@Get(':id')
	async get(@Param('id') id: string) {
		return null;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return null;
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: TopPageModel) {
		return null;
	}

	@HttpCode(200)
	@Post('search')
	async search(@Body() dto: FindTopPageDto) {
		return null;
	}
}
