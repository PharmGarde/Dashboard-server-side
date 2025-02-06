import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  pharmacyId: string;

  @Prop({ required: true })
  content: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comment);
