import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
  } from 'typeorm';
  
import { Doctor } from "src/doctor/entities/doctor.entity";
import { Message } from "src/messages/entities/message.entity";
import { Patient } from "src/patient/entities/patient.entity"
  
  @Entity()
  export class Conversation {
    @PrimaryGeneratedColumn()
    id: number; 
  
    @ManyToOne(() => Doctor, (doctor) => doctor.conversations, { eager: true })
    doctor: Doctor;
  
    @ManyToOne(() => Patient, (patient) => patient.conversations, { eager: true })
    patient: Patient;
  
    @OneToMany(() => Message, (message) => message.conversation)
    messages: Message[];

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  
  }
  

