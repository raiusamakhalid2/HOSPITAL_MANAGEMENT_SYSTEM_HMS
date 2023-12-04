import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly PatientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.PatientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.PatientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.PatientService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.PatientService.update(+id, updatePatientDto);
  }
  
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.PatientService.remove(+id);
  }
}
