import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
    Courses = 0,
    Services = 1,
    Books = 2,
    Products = 3
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
    @Prop()
    title: string;
    @Prop()
    description: string;
}

export type TopPageDocument = TopPageModel & Document;

@Schema({
    timestamps: true,
    autoIndex: true
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
    @Prop({
        type: [String],
    })
    tags: string[];
}

const TopPageSchema = SchemaFactory.createForClass(TopPageModel);

TopPageSchema.clearIndexes();

TopPageSchema.index({
    title: "text",
    seoText: "text",
    tagsTitle: "text",
    tags: "text",
    "advantages.title": "text",
    "advantages.description": "text",
})

export { TopPageSchema };