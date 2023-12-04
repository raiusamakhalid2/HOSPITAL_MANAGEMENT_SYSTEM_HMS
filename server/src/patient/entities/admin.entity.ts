import { sample } from "rxjs"
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id          : number

    @Column()
    name        : string

    @Column()
    email       : string

    @Column('simple-array',{nullable: true})
    phone       : string[]

    @Column()
    password    : string

    @Column({ type: "varchar", nullable: true })
    imageUrl: string;

  
    @Column({default: 'Admin'})
    accesstype  : string

    @Column("bool",{default: false})
    isVarified  : boolean
}