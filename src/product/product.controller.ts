import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Param,
	Post,
	NotFoundException,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { PRODUCT_NOT_FOUND } from './product.constants';
import { ProductModel } from './product.model';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

	constructor(private readonly productService: ProductService) { }

	@Post('')
	async create(@Body() dto: CreateProductDto) {
		return await this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);
		if (product) {
			return product;
		}
		else {
			throw new NotFoundException({}, PRODUCT_NOT_FOUND);
		}
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.delete(id);
		if (deletedProduct) {
			return deletedProduct;
		}
		else {
			throw new NotFoundException({}, PRODUCT_NOT_FOUND);
		}
	}

	@Patch(':id')
	async update(@Param('id', IdValidationPipe) id: string, @Body() dto: ProductModel) {
		const updatedProduct = await this.productService.update(id, dto);
		if (updatedProduct) {
			return updatedProduct;
		}
		else {
			throw new NotFoundException({}, PRODUCT_NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('search')
	async search(@Body() dto: FindProductDto) {
		return await this.productService.search(dto);
	}
}
