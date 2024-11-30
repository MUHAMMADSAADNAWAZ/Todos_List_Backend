import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

export type UserDocument = User & Document & { _id: Types.ObjectId };

@Schema()
export class User{

    @Prop({required: true})
    username: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: Date.now})
    createdAt: Date;

}

export const UserSchema = SchemaFactory.createForClass(User)