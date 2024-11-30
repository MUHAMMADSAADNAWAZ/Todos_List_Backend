import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'


@Controller('users')
export class UsersController {
    constructor(
        private readonly userSerive: UsersService,
    ) {}

    @Post('signup')
    async signup(@Body() body: {username: string , email: string , password: string}){
        const existinguser = await this.userSerive.findByEmail(body.email);
        if(existinguser){
            return {message: "User Already Exists"};
        }
        const newUser = this.userSerive.CreateUser(body.username , body.email , body.password);
        return {message: "User created successfully" , user: newUser}
    }

    @Post('login')
    async login(@Body() body:{email: string , password: string}){

        const user = await this.userSerive.findByEmail(body.email);
        if(!user){
            return {message: "Invalid Email or Password"}
        }

        const isPassword = await bcrypt.compare(body.password , user.password)
        if(!isPassword){
            return {message: "Invalid Email or Password"}
        }

        return {message: "Login Successfull" , user}
    }

    
}
