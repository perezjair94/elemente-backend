import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => ID)
  _id: string;

  @Field()
  sender: string;

  @Field()
  content: string;

  @Field()
  room: string;
}
