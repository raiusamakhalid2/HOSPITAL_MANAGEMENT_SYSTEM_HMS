import { PartialType } from '@nestjs/mapped-types';
import { CreateUpdatePasswordDto } from './create-update-password.dto';

export class UpdateUpdatePasswordDto extends PartialType(CreateUpdatePasswordDto) {}
