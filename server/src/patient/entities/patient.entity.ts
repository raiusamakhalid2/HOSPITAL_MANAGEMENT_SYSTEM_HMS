import { Appointment } from "src/appointment/entities/appointment.entity"
import { Conversation } from "src/conversation/entities/conversation.entity"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class Patient {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email       : string    

    @Column()
    name           : string

    @Column('simple-array',{nullable: true})
    phone       : string[]

    @Column()
    password    : string
  
    @Column({default: 'Patient'})
    accesstype  : string

    @Column("bool",{default: false})
    isVarified  : boolean

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments: Appointment[];

    @OneToMany(() => Conversation, (conversation) => conversation.patient)
    conversations: Conversation[];
}
