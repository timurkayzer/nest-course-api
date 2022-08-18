import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export class ProductCharacteristic {
	@Prop()
	name: string;
	@Prop()
	value: string;
}

export type ProductDocument = ProductModel & Document;
@Schema({
	timestamps: true
})
export class ProductModel {
	@Prop()
	image: string;
	@Prop()
	title: string;
	@Prop()
	price: number;
	@Prop()
	salePrice: number;
	@Prop()
	credit: number;
	@Prop()
	description: string;
	@Prop()
	advantages: string;
	@Prop()
	disadvantages: string;
	@Prop({ type: () => [String] })
	categories: string[];
	@Prop({ type: () => [String] })
	tags: string[];
	@Prop({ type: () => [ProductCharacteristic] })
	characteristics: ProductCharacteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);