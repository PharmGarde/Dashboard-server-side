import { Module } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { PharmaciesController } from './pharmacies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmaciesSchema, Pharmacy } from './schemas/pharmacies.schema';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from 'src/guadrs/roles.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pharmacy.name, schema: PharmaciesSchema }])],
  controllers: [PharmaciesController],
  providers: [PharmaciesService, RolesGuard, Reflector],
})
export class PharmaciesModule {}
