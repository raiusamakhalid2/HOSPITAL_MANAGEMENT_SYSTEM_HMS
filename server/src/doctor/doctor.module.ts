import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Admin } from 'src/patient/entities/admin.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';



@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Category, Patient, Admin]),
  MulterModule.register(multerOptions), 
],
  controllers: [DoctorController],
  providers: [DoctorService],
})
export class DoctorModule {}
