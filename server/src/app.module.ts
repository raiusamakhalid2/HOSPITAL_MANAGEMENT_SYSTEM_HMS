import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientModule } from './patient/patient.module';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DoctorModule } from './doctor/doctor.module';
import { CategoryModule } from './category/category.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessagesModule } from './messages/messages.module';
import { UpdatePasswordModule } from './update-password/update-password.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST'),
        port: +configService.get('PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    PatientModule,
    AuthModule,
    DoctorModule,
    CategoryModule,
    AppointmentModule,
    ConversationModule,
    MessagesModule,
    UpdatePasswordModule,
    ScheduleModule.forRoot(),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
