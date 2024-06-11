import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schemas/message.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<MessageDocument>, // inject the model
  ) {}

  // create a new message
  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const message = new this.messageModel(createMessageInput);
    return message.save();
  }

  // find all messages
  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    console.log('updateMessageInput', updateMessageInput);
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }

  // find all messages by room
  async findAllByRoom(room: string): Promise<Message[]> {
    const query = { room };
    return this.messageModel.find(query).exec();
  }
}
