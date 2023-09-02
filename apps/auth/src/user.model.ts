import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User as IUser, Role } from '@app/common';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
})
export class User implements Omit<IUser, 'id'> {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    enum: Role,
    type: 'number',
    required: true,
    default: Role.UNRECOGNIZED,
  })
  role: Role;

  id: string;
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('id').get(function (this: UserDocument) {
  return this._id.toString();
});

export { UserSchema };
