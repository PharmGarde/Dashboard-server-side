import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FavoritesModule } from './favorites/favorites.module';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsModule } from './comments/comments.module';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { PharmaciesModule } from './pharmacies/pharmacies.module';
import { FavoritesModule } from './favorites/favorites.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI,
      })
    }),
    UserModule, PharmacyModule, FavoritesModule, CommentsModule, UsersModule, PharmaciesModule
    
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
