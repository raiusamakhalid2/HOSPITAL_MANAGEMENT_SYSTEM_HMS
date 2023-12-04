import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(@Body() createConversationDto: CreateConversationDto) {
    return this.conversationService.create(createConversationDto);
  }

  @Get()
  findAll() {
    return this.conversationService.findAll();
  }

  @Get('online/:email')
  findOneOnline(@Param('email') email: string){
    return this.conversationService.findOneOnline(email);
  }

  @Get('Patient/:id')
  findOnepatient(@Param('id') id: string) {
    return this.conversationService.findOnepatient(+id);
  }

  @Get('Doctor/:id')
  findOnedoctor(@Param('id') id: string) {
    return this.conversationService.findOnedoctor(+id);
  }

}
