import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

    async create(createTodoDto : {name: string ; description: string ; userid: string}){
        const newTodo = new this.todoModel(createTodoDto);
        return newTodo.save()
    }

    async findAll(userid: string){
        return this.todoModel.find({userid}).exec()
    }

    async findOne(id: string){
        return this.todoModel.findById(id).exec()
    }

    async update(id: string , updateTodo: {name: string; description: string}){
        return this.todoModel.findByIdAndUpdate(id, updateTodo , {new: true}).exec()
    }

    async remove(id: string){
        return this.todoModel.findByIdAndDelete(id).exec()
    }


}
