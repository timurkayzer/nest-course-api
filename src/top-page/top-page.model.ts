import { Module } from '@nestjs/common';
import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export enum TopLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

class TopPageHH {
    @Prop()
    count: number;
    @Prop()
    juniorSalary: number;
    @Prop()
    middleSalary: number;
    @Prop()
    seniorSalary: number;
}

class TopPageAdvantage {
    title: string;
    description: string;
}

export type TopPageDocument = TopPageModel & Document;
@Schema({
    timestamps: true
})
export class TopPageModel {
    @Prop({ enum: TopLevelCategory })
    firstCategory: TopLevelCategory;
    @Prop()
    secondCategory: string;
    @Prop()
    title: string;
    @Prop()
    category: string;
    @Prop({ type: TopPageHH })
    hh?: TopPageHH;
    @Prop({ type: () => [TopPageAdvantage] })
    advantages: TopPageAdvantage[]
    @Prop()
    seoText: string;
    @Prop()
    tagsTitle: string;
    @Prop({ type: [String] })
    tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);