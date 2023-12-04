import { Doctor } from "src/doctor/entities/doctor.entity";
import { Patient } from "src/patient/entities/patient.entity";

export class CreateConversationDto {
    readonly doctor      : Doctor;
    readonly patient     : Patient;
}
