import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  @Roles('ADMIN')
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(createFavoriteDto);
  }

  @Get()
  @Roles('USER')
  findAll() {
    return this.favoritesService.findAll();
  }
}
