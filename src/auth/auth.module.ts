import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthModel, AuthModelSchema } from './auth.model';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthModel.name,
        schema: AuthModelSchema
      }
    ])
  ]
})
export class AuthModule { }
