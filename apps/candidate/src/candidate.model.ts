import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Candidate as ICandidate } from '@app/common';

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema({
  toJSON: {
    getters: true,
  },
})
export class Candidate implements Omit<ICandidate, 'id'> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  education: string;

  @Prop()
  website?: string;

  @Prop()
  socialMedia: string[];
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
