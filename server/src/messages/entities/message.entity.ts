import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
  } from 'typeorm';
  
import { Conversation } from "src/conversation/entities/conversation.entity"
  
  @Entity()
  export class Message {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    sender: string;
  
    @Column()
    text: string;
  
    @ManyToOne(() => Conversation, (conversation) => conversation.messages, { eager: true })
    conversation: Conversation;
  
    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  }
  
