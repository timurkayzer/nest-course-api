import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type AuthModelDocument = AuthModel & Document;
@Schema()
export class AuthModel {
    _id: ObjectId;
    @Prop()
    email: string;
    @Prop()
    passwordHash: string;
    @Prop()
    createdAt: Date;
    @Prop()
    updatedAt: Date;
}

export const AuthModelSchema = SchemaFactory.createForClass(AuthModel);
