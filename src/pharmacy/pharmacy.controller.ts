import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './Dtos/create-pharmacy.dto';
import { UpdatePharmacyDto } from './Dtos/update-pharmacy.dto';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Roles('ADMIN')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPharmacyDto: CreatePharmacyDto) {
    return await this.pharmacyService.create(createPharmacyDto);
  }
  @Get()
  async findAll() {
    return await this.pharmacyService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pharmacyService.findOne(id);
  }
  @Roles('ADMIN')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePharmacyDto: UpdatePharmacyDto,
  ) {
    return await this.pharmacyService.update(id, updatePharmacyDto);
  }
  @Roles('ADMIN')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.pharmacyService.remove(id);
  }
}
