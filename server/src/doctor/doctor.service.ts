import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Category } from 'src/category/entities/category.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { Admin } from 'src/patient/entities/admin.entity';



@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,

    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}  


  async EmailExistancetocreat(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorRepository.findOne({where:{ email: createDoctorDto.email }});
  
    if (doctor) {
      return new NotFoundException(`Email ${createDoctorDto.email} already exists`);
    } else {
      const patient = await this.patientRepository.findOne({ where: { email: createDoctorDto.email } });
  
      if (patient) {
        return new NotFoundException(`Email ${createDoctorDto.email} already exists as Patient`);
      } else {
        const admin = await this.adminRepository.findOne({ where: { email: createDoctorDto.email } });
  
        if (admin) {
          return new NotFoundException(`Email ${createDoctorDto.email} already exists as Admin`);
        }
        // } else {
        //   return await this.NotExistNowcreate(createDoctorDto, img);
        // }
      }
    }
  }
  

  async create(createDoctorDto: CreateDoctorDto, img: string) {
    const emailExist = await this.EmailExistancetocreat(createDoctorDto)
    if(emailExist) {
      return emailExist;
    }
   const category = await this.categoryRepository.findOne({ where: { id: createDoctorDto.category } });

    if (!category) {
      return new NotFoundException(`Category ${createDoctorDto.category} does not exist`);
    }

    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);

    const doctor = this.doctorRepository.create({
      ...createDoctorDto,
      password: hashedPassword,
      imageUrl: img, 
      category,
    }); 

    return await this.doctorRepository.save(doctor);
  }

  

  async findAll() {
    const doctors = await this.doctorRepository.find()
    if (!doctors){
      return new NotFoundException('Category not found');
    }
    return doctors
  }


async findOneByCategory(param: string) {
  const category = await this .categoryRepository.findOne({where:{name: param}})
  const categoryId = category.id;
  return await this.doctorRepository.find({ where: { category: { id: categoryId } } });

}

  


  async findOne(id: number) {
    return await this.doctorRepository.findOneBy({id})
  }



  async EmialExistencetoupdate(id:number,updateDoctorDto: UpdateDoctorDto) {
    const doctorWithEmail = await this.doctorRepository.findOne({
      where: { email: updateDoctorDto.email },
    });
    if (doctorWithEmail && doctorWithEmail.id !== id) {
      return new NotFoundException(`Email ${updateDoctorDto.email} already exists for another doctor`);
    }
    const patientWithEmail = await this.patientRepository.findOne({
      where: { email: updateDoctorDto.email },
    });
    if (patientWithEmail) {
      return new NotFoundException(`Email ${updateDoctorDto.email} already exists as Patient`);
    }
    const adminWithEmail = await this.adminRepository.findOne({
      where: { email: updateDoctorDto.email },
    });
    if (adminWithEmail) {
      return new NotFoundException(`Email ${updateDoctorDto.email} already exists as Admin`);
    } 
    
  }
  

  async update(id: number, img:string, updateDoctorDto: UpdateDoctorDto) {
    const emailExist = await this.EmialExistencetoupdate(id,updateDoctorDto)
    if (emailExist) {
      return emailExist;
    }
    const category = await this.categoryRepository.findOneBy({id:updateDoctorDto.category});
    if(!category){
      return new NotFoundException('Category not found');
    }
    const hashedPassword = await bcrypt.hash(updateDoctorDto.password, 10);
    const doctor = this.doctorRepository.create({
     ...updateDoctorDto,
      category,
      password:hashedPassword,
      imageUrl: img,
    });
    await this.doctorRepository.update(id, doctor)
    return this.doctorRepository.findOneBy({id})
  }
  

  async remove(id: number) {
    const doctor = await this.doctorRepository.findOneBy({id})
    await this.doctorRepository.remove(doctor)
    return 'Doctor removed successfully';
  }
}
