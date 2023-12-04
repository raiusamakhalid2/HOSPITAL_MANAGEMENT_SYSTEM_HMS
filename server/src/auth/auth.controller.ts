import { Controller, Post, Body, HttpCode, HttpStatus, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
  
@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  login(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.login(createPatientDto);
  }

  @Post('forget')
  forget(@Body() createPatientDto: CreatePatientDto) {
    return this.authService.forget(createPatientDto);
  }

  @Patch(':id')
  varifyPatient(@Param('id') id: number){
    return this.authService.varifyPatient(+id);
  }

}
