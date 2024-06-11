import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Message)
export class MessagesResolver {
  constructor(private readonly messagesService: MessagesService) {}

  // create a new message
  @Mutation(() => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ) {
    const message = await this.messagesService.create(createMessageInput);
    pubSub.publish('messageAdded', { messageAdded: message });
    return message;
  }

  // find all messages
  @Query(() => [Message], { name: 'messages' })
  async findAll() {
    return this.messagesService.findAll();
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('updateMessageInput') updateMessageInput: UpdateMessageInput,
  ) {
    return this.messagesService.update(
      updateMessageInput.id,
      updateMessageInput,
    );
  }

  @Mutation(() => Message)
  removeMessage(@Args('id', { type: () => Int }) id: number) {
    return this.messagesService.remove(id);
  }

  // find all messages by room
  @Query(() => [Message], { name: 'messagesByRoom' })
  async findAllByRoom(@Args('room') room: string) {
    return this.messagesService.findAllByRoom(room);
  }

  // subscriptions to messages added to a room
  @Subscription(() => Message, {
    name: 'messageAdded',
    filter: (payload, varibales) =>
      payload.messageAdded.room === varibales.room,
  })
  subscribeToMessageAdded(@Args('room') room: string) {
    console.log('room', room);
    return pubSub.asyncIterator('messageAdded');
  }
}
