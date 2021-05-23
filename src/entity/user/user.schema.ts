import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User extends Document {
  @Prop()
  userName: string;
  @Prop()
  password: string;
  @Prop()
  fullName: string;
  @Prop()
  email: string;
  @Prop()
  phone: string;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
