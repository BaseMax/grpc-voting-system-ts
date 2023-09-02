import { Election as IElection } from '@app/common';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ElectionDocument = HydratedDocument<Election>;

@Schema({
  toJSON: {
    getters: true,
  },
})
export class Election implements Omit<IElection, 'id'> {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;

  @Prop({ required: true })
  isActive: boolean;
}

export const ElectionSchema = SchemaFactory.createForClass(Election);
