import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';



@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  // @Post()
  // create(@Body() createDoctorDto: CreateDoctorDto) {
  //   return this.doctorService.create(createDoctorDto);
  // }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(@UploadedFile() image: any, @Body() createDoctorDto: CreateDoctorDto) {
    const img = image.filename
    return this.doctorService.create(createDoctorDto, img);
  }


  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get('category/:param')
  findOneByCategory(@Param('param') param: string) {
    return this.doctorService.findOneByCategory(param);
  }

  

  
  @Get('doctorimage/:imgname')
  findDoctorImage(@Param('imgname') imgname: string | undefined, @Res() res: any) {
    if (!imgname) {
      return res.sendFile('default.png', { root: 'uploads/doctor' });
    }
    res.sendFile(imgname, { root: 'uploads/doctor' }, (err: any) => {
      if (err) {
        res.sendFile('default.png', { root: 'uploads/doctor' });
      }
    });
  }

  
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }


  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(@Param('id') id: number, @UploadedFile() image: any, @Body() updateDoctorDto: UpdateDoctorDto) {
    const img = image ? image.filename : null; 
    return this.doctorService.update(+id, img, updateDoctorDto);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }
}
