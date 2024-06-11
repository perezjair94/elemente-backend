import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field(() => String)
  sender: string;

  @Field(() => String)
  content: string;

  @Field(() => ID)
  room: string;
}
