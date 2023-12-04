import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,

  ) {} 

  async create(createMessageDto: CreateMessageDto) {
    return await this.messageRepository.save(createMessageDto)
  }

  async findAll() {
    return await this.messageRepository.find()
  } 

  async findOne(id: number) {
    return await this.messageRepository.findOne({where:{id:id}})
  }

  async findMessages( id:number, page: number) {
    const batchSize = 10;
    const skip = (page - 1) * batchSize;
    try {
      return await this.messageRepository.find({
        where: { conversation: {id} },
        order: { createdAt: 'DESC' },
        skip: skip,
        take: batchSize,
      });
    } catch (error) {
      throw error;
    }
  }

}
