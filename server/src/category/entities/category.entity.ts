import { Doctor } from "src/doctor/entities/doctor.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id          : number

    @Column()
    name       : string

    @OneToMany(() => Doctor, (doctor) => doctor.category)
    doctors: Doctor

}
