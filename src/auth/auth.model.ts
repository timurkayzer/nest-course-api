import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

export type AuthDocument = AuthModel & Document;
@Schema({
    timestamps: true
})
export class AuthModel {
    @Prop({
        unique: true
    })
    email: string;
    @Prop()
    passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
