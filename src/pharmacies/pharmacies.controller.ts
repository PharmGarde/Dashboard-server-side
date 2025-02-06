import { Controller, Get, Post, Body } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { CreatePharmacyDto } from './DTOs/create-pharmacy.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmacyService: PharmaciesService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return this.pharmacyService.create(createPharmacyDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.pharmacyService.findAll();
  }
}
