import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop()
  avatar?: string;

  @Prop()
  cognitoId?: string;
}
