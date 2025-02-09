import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { User } from "src/user/schemas/users.schema";

export type PharmacyDocument = Pharmacy & Document;

@Schema({ timestamps: true })
export class Pharmacy {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  administrator: User;

  @Prop({ required: true, maxlength: 30 })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true, maxlength: 15 })
  phoneNumber: string;

  @Prop({ required: false })
  openingHoursNight: string; 

  @Prop({ required: true, default:false})
  nightshift: boolean;

  @Prop({ required: true, default:false})
  weekendshift: boolean;

  @Prop({ required: false })
  dutyDate?: Date;

  @Prop({ required: false })
  imageUrl?: string;
}

export const PharmacySchema = SchemaFactory.createForClass(Pharmacy);