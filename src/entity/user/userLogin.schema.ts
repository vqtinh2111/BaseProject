import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from "mongoose";
import { User, UserSchema } from "./user.schema";

@Schema()
export class UserLogin extends Document {
  @Prop({type: Types.ObjectId})
  userId: Types.ObjectId;
  @Prop()
  accessToken: string;
  @Prop()
  expiredAt: Date;
  @Prop({ default: false })
  isDeleted: boolean;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({ default: new Date() })
  updatedAt: Date;
}

export const UserLoginSchema = SchemaFactory.createForClass(UserLogin);
