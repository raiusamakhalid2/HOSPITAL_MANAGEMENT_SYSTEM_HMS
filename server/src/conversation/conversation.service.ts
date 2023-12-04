import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation) 
    private conversationRepository: Repository<Conversation>,
    
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

  ) {} 


  async create(createConversationDto: CreateConversationDto) {
    const conversation = await this.conversationRepository
    .createQueryBuilder('conversation')
    .leftJoinAndSelect('conversation.doctor', 'doctor')
    .leftJoinAndSelect('conversation.patient', 'patient')
    .where('doctor.id = :doctorId', { doctorId: createConversationDto.doctor })
    .andWhere('patient.id = :patientId', { patientId: createConversationDto.patient })
    .getOne();
    if (!conversation){
    return await this.conversationRepository.save(createConversationDto);
    }
    return new NotFoundException('Chat Already exists'); 
    

  }

  async findAll() {
    return await this.conversationRepository.find()
  }

  async findOnedoctor(id: number) {
    return  await this.conversationRepository.find({where:{doctor:{id}}})
  }

  async findOnepatient(id: number) {
    return  await this.conversationRepository.find({where:{patient:{id}}})
  }

  async findOneOnline(email: string) {
    const patient =  await this.patientRepository.findOne({where:{email: email}})
    if (!patient){
      return await this.doctorRepository.findOne({where:{email: email}})
    }
    return patient
  } 
}
