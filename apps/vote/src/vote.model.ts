import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Vote as IVote } from '@app/common';

export type VoteDocument = HydratedDocument<Vote>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class Vote implements Omit<IVote, 'id'> {
  @Prop()
  candidateId: string;

  @Prop()
  electionId: string;

  @Prop()
  userId: string;
}

const VoteSchema = SchemaFactory.createForClass(Vote);
VoteSchema.virtual('id').get(function(this: VoteDocument) {
  return this._id.toString();
});

export { VoteSchema };
