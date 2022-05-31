import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Schema as MongooseSchema } from "mongoose";
import { ProductModel } from "src/product/product.model";

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
	@Prop({ type: MongooseSchema.Types.ObjectId, ref: 'ProductModel', index: { unique: false } })
	productId: ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);