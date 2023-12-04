import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { Patient } from './entities/patient.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Doctor, Admin])],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
