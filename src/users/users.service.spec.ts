// user.schema.ts

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  money: number;

  @Prop({ required: true })
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
