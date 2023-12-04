import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from "src/category/entities/category.entity";
import { Appointment } from "src/appointment/entities/appointment.entity";
import { Conversation } from "src/conversation/entities/conversation.entity";

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "varchar" })
    phone: string;

    @Column({ type: "varchar" })
    password: string;

    @Column()
    experience: number;

    @Column({ nullable: true })
    fee: number;

    @Column({ type: "varchar" })
    gender: string;

    @Column({ type: "varchar", nullable: true })
    education: string;

    @Column({ type: "varchar" })
    address: string;

    @Column({ type: "varchar", nullable: true })
    description: string;

    @Column({ type: "simple-array" })
    timeslot: string[];

    @Column({ type: "varchar", default: 'Doctor' })
    accesstype: string;

    @Column({ type: "varchar", nullable: true })
    imageUrl: string;

    @Column({ type: "json", nullable: true })
    location: object;

    @Column({ type: "bool", default: false })   
    isVerified: boolean;

    @ManyToOne(() => Category, (category) => category.doctors, { eager: true })
    category: Category;

    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    appointments: Appointment[];

    @OneToMany(() => Conversation, (conversation) => conversation.doctor)
    conversations: Conversation[];
}
