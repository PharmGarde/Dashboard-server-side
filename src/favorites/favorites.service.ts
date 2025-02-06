import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './schemas/favorites.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';


@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite.name) private favoriteModel: Model<Favorite>) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const newFavorite = new this.favoriteModel(createFavoriteDto);
    return newFavorite.save();
  }

  async findAll(): Promise<Favorite[]> {
    return this.favoriteModel.find().exec();
  }
}