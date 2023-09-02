import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Candidate as ICandidate } from '@app/common';
import { Transform } from 'class-transformer';

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  virtuals: true,
})
export class Candidate implements Omit<ICandidate, 'id'> {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  education: string;

  @Prop()
  website?: string;

  @Prop()
  socialMedia: string[];
}

const CandidateSchema = SchemaFactory.createForClass(Candidate);
CandidateSchema.virtual('id').get(function (this: CandidateDocument) {
  return this._id.toString();
});
export { CandidateSchema };
