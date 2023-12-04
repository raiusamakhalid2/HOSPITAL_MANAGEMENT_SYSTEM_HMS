import { Injectable } from '@nestjs/common';
import { UpdateUpdatePasswordDto } from './dto/update-update-password.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Admin } from 'src/patient/entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { Appointment } from '../appointment/entities/appointment.entity';

@Injectable()
export class UpdatePasswordService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Appointment)
    private readonly appointmentsRepository: Repository<Appointment>,
  ) {}  

  async findAll(){
    const totalpatient = await this.patientRepository.count()
    const totaldoctors = await this.doctorRepository.count()
    const totalappointments = await this.appointmentsRepository.count()
    const currentDate = new Date();
    const formattedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const todayappointments = await this.appointmentsRepository.count({where: {bookingdate: formattedDate}})
     const dashbord = {
      totalpatient,
      totalappointments,
      totaldoctors,
      todayappointments,
    }
    return dashbord
  }

  async updatepatentpassword(id: number, updateUpdatePasswordDto: UpdateUpdatePasswordDto) {
    const hashedPassword = await bcrypt.hash(updateUpdatePasswordDto.password, 10);
    return await this.patientRepository.update(id, {password: hashedPassword});
  }


  async updatedoctorpassword(id: number, updateUpdatePasswordDto: UpdateUpdatePasswordDto) {
    const hashedPassword = await bcrypt.hash(updateUpdatePasswordDto.password, 10);
    return await this.doctorRepository.update(id, {password: hashedPassword})
  }


  async updateadminpassword(id: number, updateUpdatePasswordDto: UpdateUpdatePasswordDto) {
    const hashedPassword = await bcrypt.hash(updateUpdatePasswordDto.password, 10);
    return await this.adminRepository.update(id, {password: hashedPassword})
  }
  

}
