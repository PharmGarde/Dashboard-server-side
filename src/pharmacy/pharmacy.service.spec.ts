
import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyService } from './pharmacy.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PharmacyService', () => {
  let service: PharmacyService;

  const mockPharmacyModel = {
    // Add mock model methods as needed
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PharmacyService,
        {
          provide: getModelToken('Pharmacy'),
          useValue: mockPharmacyModel
        }
      ],
    }).compile();

    service = module.get<PharmacyService>(PharmacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
