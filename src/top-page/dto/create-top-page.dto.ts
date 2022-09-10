import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { TopLevelCategory } from "../top-page.model";

export class TopPageAdvantageDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
}

export class TopPageHHDto {
    @IsNumber()
    @IsPositive()
    count: number;
    @IsNumber()
    @IsPositive()
    juniorSalary: number;
    @IsNumber()
    @IsPositive()
    middleSalary: number;
    @IsNumber()
    @IsPositive()
    seniorSalary: number;
}

export class CreateTopPageDto {
    @IsNumber()
    firstCategory: TopLevelCategory;
    @IsString()
    secondCategory: string;
    @IsString()
    title: string;
    @IsString()
    category: string;
    @ValidateNested()
    @Type(() => TopPageHHDto)
    hh?: TopPageHHDto;
    @IsArray()
    @ValidateNested()
    @Type(() => TopPageAdvantageDto)
    @IsOptional()
    advantages: TopPageAdvantageDto[]
    @IsString()
    seoText: string;
    @IsString()
    tagsTitle: string;
    @IsOptional()
    @IsString({ each: true })
    @IsArray()
    tags: string[];
}