import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps: true})
export class Comment extends Document{
    @Prop({ required: false })
    userId: string;

    @Prop({required: true})
    pharmacyId: string;

    @Prop({required: true})
    body: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);