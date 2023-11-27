import {Schema, Prop , SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({require:true})
  name: string;

  @Prop({require:true})
  email: string;

  @Prop({require:true})
  password: string;

  @Prop({require:true})
  isAdmin:boolean;

  @Prop({require:true})
  current_token: string;
 
}

export const UserSchema = SchemaFactory.createForClass(User);