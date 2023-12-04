import { Module } from '@nestjs/common';
import { UpdatePasswordService } from './update-password.service';
import { UpdatePasswordController } from './update-password.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Admin } from 'src/patient/entities/admin.entity';
import { Appointment } from 'src/appointment/entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Patient, Admin, Appointment])],
  controllers: [UpdatePasswordController],
  providers: [UpdatePasswordService],
})
export class UpdatePasswordModule {}
