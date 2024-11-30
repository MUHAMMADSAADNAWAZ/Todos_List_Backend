import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModule: Model<UserDocument>) {}

    async CreateUser(username : string ,email: string , password: string): Promise<User>{
        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new this.userModule({username , email , password: hashedPassword})
        return newUser.save();
    }

    async findByEmail(email: string): Promise<User | null>{
        return this.userModule.findOne({email}).exec()
    }
}
