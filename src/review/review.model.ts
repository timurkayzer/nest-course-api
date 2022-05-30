import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type ReviewDocument = ReviewModel & Document;

@Schema({
	timestamps: true
})
export class ReviewModel {
	@Prop()
	name: string;
	@Prop()
	title: string;
	@Prop()
	description: string;
	@Prop()
	rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);