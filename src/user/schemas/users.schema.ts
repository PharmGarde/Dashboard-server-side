import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  givenName: string;

  @Prop({ required: true })
  familyName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ default: 'user' })
  user_role: string;

  @Prop()
  avatar?: string;

  @Prop()
  cognitoId?: string;
}
