import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { TopLevelCategory } from '../top-page.model';

export class FindTopPageDto {
	@IsNumber()
	firstCategory: number;
}
