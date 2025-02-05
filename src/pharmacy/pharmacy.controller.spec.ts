import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyController } from './pharmacy.controller';
import { PharmacyService } from './pharmacy.service';
import { getModelToken } from '@nestjs/mongoose';

describe('PharmacyController', () => {
  let controller: PharmacyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PharmacyController],
      providers: [
        PharmacyService,
        {
          provide: getModelToken('Pharmacy'),
          useValue: {
            new: jest.fn().mockResolvedValue({}),
            constructor: jest.fn().mockResolvedValue({}),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<PharmacyController>(PharmacyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
