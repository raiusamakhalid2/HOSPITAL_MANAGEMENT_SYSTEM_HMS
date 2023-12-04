import { Injectable, Logger } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository, LessThan } from 'typeorm';
import { Conversation } from 'src/conversation/entities/conversation.entity';
import { Cron, CronExpression } from '@nestjs/schedule';



@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,

    @InjectRepository(Conversation)
    private conversationRepository: Repository<Conversation>,
    // private readonly logger = new Logger(AppointmentService.name)
  ) {}

  
  async create(createAppointmentDto: CreateAppointmentDto) {
    const creatdoc =  await this.appointmentRepository.save(createAppointmentDto);
    if(creatdoc){

      const conversation = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.doctor', 'doctor')
      .leftJoinAndSelect('conversation.patient', 'patient')
      .where('doctor.id = :doctorId', { doctorId: createAppointmentDto.doctor })
      .andWhere('patient.id = :patientId', { patientId: createAppointmentDto.patient })
      .getOne();
      if (!conversation){
      return await this.conversationRepository.save({
        doctor : createAppointmentDto.doctor,
        patient : createAppointmentDto.patient
      });
    }
  
    }
    return creatdoc
  }


  async findAllByDoctorAndDate(id: number, date: Date) {
    return await this.appointmentRepository.find({
      where: {
        doctor:{id},
        bookingdate: date,
      },
    });
  }

  async findAllByPatientAndDate(id: number, date: Date) {
    return await this.appointmentRepository.find({
      where: {
        patient:{id},
        bookingdate: date,
      },
    });
  }
  
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return await this.appointmentRepository.update(id, updateAppointmentDto)
  }

  async remove(id: number) {
    const appoi =  await this.appointmentRepository.findOne({where:{id}})
    return await this.appointmentRepository.remove(appoi)
  }

  
  @Cron(CronExpression.EVERY_2_HOURS)
  async cancelAppointments() {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
      const appointmentsToCancel = await this.appointmentRepository.find({
        where: {
          status: 'Pending',
          createdAt: LessThan(twentyFourHoursAgo),
        },
      });

      appointmentsToCancel.forEach(async (appointment) => {
        await this.appointmentRepository.save(appointment);
        console.log(`Cancelled appointment for ${appointment.patient.name}`);
      });
    } catch (error) {
      console.error('Error cancelling appointments:', error);
    }
  }
}
