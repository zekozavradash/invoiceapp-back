import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Address {
  @Prop({ required: true, minLength: 1 })
  streetAddress: string;

  @Prop({ required: true, minLength: 1 })
  city: string;

  @Prop({ required: true, minLength: 1 })
  postCode: string;

  @Prop({ required: true, minLength: 1 })
  country: string;
}

class Item {
  @Prop({ required: true, minLength: 1 })
  name: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true, min: 1 })
  quantity: number;

  @Prop({ required: true, min: 0 })
  total: number;
}

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, index: true })
  userId: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  paymentTerms: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Address })
  billFrom: Address;

  @Prop({ required: true, type: Address })
  billTo: Address;

  @Prop({ required: true, type: [Item] })
  items: Item[];

  @Prop({ required: true })
  total: number;

  @Prop({ required: true })
  status: string;


  calculateTotal(): number {
    return this.items.reduce((acc, item) => acc + item.total, 0);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
