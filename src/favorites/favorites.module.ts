import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { RolesGuard } from 'src/guadrs/roles.guard';
import { Reflector } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { Favorite, FavoriteSchema } from './schemas/favorites.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
  ],

  controllers: [FavoritesController],
  providers: [FavoritesService, RolesGuard, Reflector],
})
export class FavoritesModule {}
