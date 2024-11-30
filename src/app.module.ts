import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import * as dotenv from 'dotenv'
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

dotenv.config() // to load environmnet variables from env

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI),
            TodosModule,
            UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
