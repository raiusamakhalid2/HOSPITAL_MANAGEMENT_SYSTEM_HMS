import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { Not, Repository } from 'typeorm';
import * as sgMail from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Admin } from './entities/admin.entity';

@Injectable()
export class PatientService {
  private readonly logger = new Logger(PatientService.name);
  
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }



  async create(createPatientDto: CreatePatientDto) {
    const doctor = await this.doctorRepository.findOne({where:{ email: createPatientDto.email }});
  
    if (doctor) {
      throw new NotFoundException(`Email ${createPatientDto.email} already exists as Doctor`);
    } else {
      const patient = await this.patientRepository.findOne({ where: { email: createPatientDto.email } });
  
      if (patient) {
        throw new NotFoundException(`Email ${createPatientDto.email} already exists as Patient`);
      } else {
        const admin = await this.adminRepository.findOne({ where: { email: createPatientDto.email } });
  
        if (admin) {
          throw new NotFoundException(`Email ${createPatientDto.email} already exists as Admin`);
        } else {
          return await this.NotExistNowcreate(createPatientDto);
        }
      }
    }
  }


  async NotExistNowcreate(createPatientDto: CreatePatientDto) {
    try {
      // const hashedPassword = await bcrypt.hash(createPatientDto.password, 10);

      // const patientToCreate = {
      //   ...createPatientDto,
      //   token: token,
      // };

      const newPatient = await this.patientRepository.save(createPatientDto);
      if (newPatient){
        const token = jwt.sign({ patientId: newPatient.id }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        });
          const msg = {
            to: newPatient.email,
            from: 'usama.khalid@vaival.com',
            subject: 'Verification Email',
            templateId: "d-77bfc1b87fe44817baf11a343d201bdd", 
            dynamicTemplateData: {
                verification_link: `http://localhost:3000/verify/${token}`,
            } 

        }

          try {
            await sgMail.send(msg);
            this.logger.log('Email sent successfully');
            return token;
          } catch (error) {
            this.logger.error('Error sending email', error);
          }
        }
      return newPatient


    } catch (error) {
      console.error('Error creating patient:', error.message);
      throw new Error('Failed to create patient');
    }
  }
  


  async findAll() {
    const patient = await this.patientRepository.find();
    if (!patient) {
      throw new Error('Patients not found');
    }
    return patient;
  }

  

  async findOne(id: number) {
    const patient = await this.patientRepository.findBy({ id });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }



  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const doctorWithEmail = await this.doctorRepository.findOne({
      where: { email: updatePatientDto.email },
    });
  
    if (doctorWithEmail && doctorWithEmail.id !== id) {
      throw new NotFoundException(`Email ${updatePatientDto.email} already exists for another doctor`);
    }
  
    const patientWithEmail = await this.patientRepository.findOne({
      where: { email: updatePatientDto.email },
    });
  
    if (patientWithEmail) {
      throw new NotFoundException(`Email ${updatePatientDto.email} already exists as Patient`);
    }
  
    const adminWithEmail = await this.adminRepository.findOne({
      where: { email: updatePatientDto.email },
    });
  
    if (adminWithEmail) {
      throw new NotFoundException(`Email ${updatePatientDto.email} already exists as Admin`);
    }

  
    await this.patientRepository.update(id, updatePatientDto)
    return this.patientRepository.findOneBy({id})
    
  }


  async remove(id: number) {
    const entity = await this.patientRepository.findOneBy({ id });
    await this.patientRepository.remove(entity);
    return 'remove Successfully';
  }
  
}
