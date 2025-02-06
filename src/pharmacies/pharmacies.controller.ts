import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { CognitoAuthGuard } from 'src/guadrs/cognito.guard';

// @UseGuards(CognitoAuthGuard)
@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return this.pharmaciesService.create(createPharmacyDto);
  }

  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.pharmaciesService.findAll();
  }
}
