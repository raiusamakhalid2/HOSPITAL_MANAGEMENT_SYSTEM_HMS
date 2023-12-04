import { Doctor } from "src/doctor/entities/doctor.entity"
import { Patient } from "src/patient/entities/patient.entity"
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm"

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    bookedsloot: number

    @Column()
    bookingdate: Date

    @Column({default: "Pending"})
    status: string

    @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
    doctor: Doctor;

    @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true})
    patient: Patient;


    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}
