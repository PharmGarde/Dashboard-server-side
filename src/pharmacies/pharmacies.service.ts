import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pharmacy } from './schemas/pharmacies.schema';
import { Model } from 'mongoose';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';

@Injectable()
export class PharmaciesService {
    constructor(@InjectModel(Pharmacy.name) private pharmacyModel: Model<Pharmacy>) {}

    async create(createPharmacyDto: CreatePharmacyDto): Promise<Pharmacy> {
      const newPharmacy = new this.pharmacyModel(createPharmacyDto);
      return newPharmacy.save();
    }
  
    async findAll(): Promise<Pharmacy[]> {
      return this.pharmacyModel.find().exec();
    }
}
