import { Controller } from '@nestjs/common';
import { PharmaciesService } from './pharmacies.service';

@Controller('pharmacies')
export class PharmaciesController {
  constructor(private readonly pharmaciesService: PharmaciesService) {}
}
