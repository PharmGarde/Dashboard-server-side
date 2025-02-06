import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AwsCognitoService } from 'src/aws/aws-cognito.service';

@Module({
  providers: [AwsCognitoService, UsersService],
  controllers: [UsersController],
  exports: [AwsCognitoService],
})
export class UsersModule {}