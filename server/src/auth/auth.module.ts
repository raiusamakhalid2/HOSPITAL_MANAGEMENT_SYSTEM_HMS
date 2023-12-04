import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Admin } from 'src/patient/entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Doctor, Admin])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
