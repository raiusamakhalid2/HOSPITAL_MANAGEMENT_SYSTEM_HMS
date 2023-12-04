import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get(':id')
  findAllByDoctorAndDate(@Param('id') id: number, @Query('date') date: Date) {
    return this.appointmentService.findAllByDoctorAndDate(id, date);
  }  
  
  @Get('patient/:id')
  findAllByPatientAndDate(@Param('id') id: number, @Query('date') date: Date) {
    return this.appointmentService.findAllByPatientAndDate(id, date);
  } 

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
