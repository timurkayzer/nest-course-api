import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UserModel, UserSchema } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/configs/jwt.config';
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: UserModel.name,
        schema: UserSchema
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    PassportModule
  ],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
