import { Doctor } from "src/doctor/entities/doctor.entity";
import { Patient } from "src/patient/entities/patient.entity";

export class CreateAppointmentDto {
    readonly bookedsloot : number;
    readonly bookingdate : Date;
    readonly doctor      : Doctor;
    readonly patient     : Patient;
}
