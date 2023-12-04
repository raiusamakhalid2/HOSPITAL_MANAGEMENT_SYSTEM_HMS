import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UpdatePasswordService } from './update-password.service';
import { UpdateUpdatePasswordDto } from './dto/update-update-password.dto';

@Controller('updatepass')
export class UpdatePasswordController {
  constructor(private readonly updatePasswordService: UpdatePasswordService) {}

  @Get('appointment')
  findAll() {
    return this.updatePasswordService.findAll();
  }

  @Patch('Patient/:id')
  updatepatentpassword(@Param('id') id: string, @Body() updateUpdatePasswordDto: UpdateUpdatePasswordDto) {
    return this.updatePasswordService.updatepatentpassword(+id, updateUpdatePasswordDto);
  }
  
  @Patch('Doctor/:id')
  updatedoctorpassword(@Param('id') id: string, @Body() updateUpdatePasswordDto: UpdateUpdatePasswordDto) {
    return this.updatePasswordService.updatedoctorpassword(+id, updateUpdatePasswordDto);
  }

  @Patch('Admin/:id')
  updateadminpassword(@Param('id') id: string, @Body() updateUpdatePasswordDto: UpdateUpdatePasswordDto) {
    return this.updatePasswordService.updateadminpassword(+id, updateUpdatePasswordDto);
  }

}
