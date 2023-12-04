import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './entities/appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Conversation])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
