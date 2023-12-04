import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as sgMail from '@sendgrid/mail';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { Patient } from 'src/patient/entities/patient.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Admin } from 'src/patient/entities/admin.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async login(createPatientDto: CreatePatientDto) {
    try {
      const patient = await this.patientRepository.findOneBy({
        email: createPatientDto.email,
      });

      if (!patient) {
        return await this.logindoctor(createPatientDto);
      }
      const isPasswordValid = await bcrypt.compare(createPatientDto.password,patient.password);

      if (!isPasswordValid) {
        return new NotFoundException('Password not found');
      }

      if(!patient.isVarified){{
        const sendto = patient
        return await this.sendverificationPatient(sendto)
      }}

      const jesontoken = jwt.sign(
        { userId: patient.id, name: patient.name, Access_Type: patient.accesstype, email:patient.email },process.env.JWT_SECRET_KEY,{ expiresIn: '100h' },
      );
      return jesontoken;
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }

  async logindoctor(createPatientDto: CreatePatientDto) {
    try {
      const doctor = await this.doctorRepository.findOneBy({
        email: createPatientDto.email,
      });
      if (!doctor) {
        return await this.loginadmin(createPatientDto);
      }
      const isPasswordValid = await bcrypt.compare(createPatientDto.password,doctor.password);

      if (!isPasswordValid) {
        return new NotFoundException('Password not found');
      }


      const jesontoken = jwt.sign(
        { userId: doctor.id, name:doctor.name ,Access_Type: doctor.accesstype,email:doctor.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '10h',
        },
      );
      return jesontoken;
    } catch (error) {
      console.error('Error during loginDOCTOR:', error.message);
      throw new Error('Doctor login failed');
    }
  }

  async loginadmin(createPatientDto: CreatePatientDto) {
    try {
      const admin = await this.adminRepository.findOneBy({
        email: createPatientDto.email,
      });
      if (!admin) {
        return new NotFoundException('Email not found');
      }
      const isPasswordValid = await bcrypt.compare(createPatientDto.password,admin.password );

      if (!isPasswordValid) {
        return new NotFoundException('Password not found');
      }
      const jesontoken = jwt.sign(
        { userId: admin.id, name:admin.name ,Access_Type: admin.accesstype, email:admin.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '10h',
        },
      );
      return jesontoken;
    } catch (error) {
      console.log('Error during login: ADMIN');
    }
  }


  async sendverificationPatient(sendto) {
    const token = await jwt.sign({ verifyId: sendto.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });
      const msg = {
        to: sendto.email,
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
        return new NotFoundException('Email not verified, verfiy by email', token);
      } catch (error) {
        this.logger.error('Error sending email', error);
      }
  }




  async varifyPatient(id: number) {
      const patient = await this.patientRepository.findBy({ id });
      if (!patient) {
        return new NotFoundException('Invalid Link')
      }

      let _patient = patient[0];
      if (_patient.isVarified) {
        return new NotFoundException('Already Varified')
      }
      await this.patientRepository.update(id, { isVarified: true });
      return "Successfully Varified";

  }
  

  async forget(createPatientDto: CreatePatientDto) {
    const patient = await this.patientRepository.findOne({ where: { email: createPatientDto.email } });
    if (patient) {
        const sendto = patient
        return await this.sendforget(sendto)
    }
  
    const doctor = await this.doctorRepository.findOne({ where: { email: createPatientDto.email } });
    if (doctor) {
      const sendto = doctor
        return await this.sendforget(sendto)   
       }
  
    const admin = await this.adminRepository.findOne({ where: { email: createPatientDto.email } });
    if (admin) {
      const sendto = admin
        return await this.sendforget(sendto)
    }
  
    return new NotFoundException('Enter valid email');
  }

  async sendforget(sendto) {
    const token = await jwt.sign({ userId: sendto.id, accesstype:sendto.accesstype }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

      const msg = {
        to: sendto.email,
        from: {
          name: "GLORIUM",
          email:'usama.khalid@vaival.com'
        },
        subject: "Forgot Password",
        templateId: "d-995fd3cc346f4ce4aad63e572a516b5c",   
        dynamicTemplateData: {
          verification_link: `http://localhost:3000/creatnewpassword/${token}`, 
        } 
    }

      try {
        await sgMail.send(msg);
        this.logger.log('Email sent successfully');
        return token
      } catch (error) {
        this.logger.error('Error sending email', error);
      }
  }
  
}
