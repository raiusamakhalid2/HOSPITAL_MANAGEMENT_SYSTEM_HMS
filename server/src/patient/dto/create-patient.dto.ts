export class CreatePatientDto {
  readonly name         : string;
  readonly email        : string;
  readonly phone        : string[];
  readonly password     : string;
  readonly accesstype   : string;
  readonly isVarified   : boolean;
}
