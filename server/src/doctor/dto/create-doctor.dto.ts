export class CreateDoctorDto {
    readonly name      : string;    
    readonly email     : string;
    readonly phone     : string;
    readonly password  : string;
    readonly experience: number;
    readonly education : string;
    readonly fee       : number;    
    readonly gender    : string;
    readonly category  : number;
    readonly address   : string;
    readonly description: string;
    readonly location  : object;

}
