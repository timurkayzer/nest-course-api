import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import { UserDocument, UserModel } from './user.model';
import { hash, compare, genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) { }

    async createUser(dto: AuthDto): Promise<UserDocument> {
        const salt = await genSalt(10);
        const password = await hash(dto.password, salt);

        return await this.userModel.create({
            email: dto.login,
            passwordHash: password
        });
    }

    async loginUser(dto: AuthDto): Promise<string | null> {

        const user = await this.findUser(dto.login);

        if (!user) {
            return null;
        }
        else {
            // const salt = await genSalt(10);
            // const password = await hash(dto.password, salt);

            const isPasswordCorrect = await compare(dto.password, user.passwordHash);

            if (!isPasswordCorrect) {
                return null;
            }
            else {
                return await this.jwtService.sign({ email: user.email });
            }
        }

    }

    async findUser(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({
            email
        });
    }

}
