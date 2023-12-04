import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { Conversation } from './entities/conversation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Patient, Doctor])],
  controllers: [ConversationController],
  providers: [ConversationService],
})
export class ConversationModule {}
