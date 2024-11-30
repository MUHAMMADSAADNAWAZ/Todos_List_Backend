import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post()
    create(@Body() createTodo: {name: string ; description: string ; userid: string}){
        return this.todosService.create(createTodo)
    }

    @Get()
    findAll(@Query('userid') userid: string){
        return this.todosService.findAll(userid)
    }

    @Get(':id')
    findOne(@Param('id') id:string){
        return this.todosService.findOne(id)
    }

    @Put(':id')
    update(@Param('id') id:string ,@Body() updateTodo:{name: string ; description:string} ){
        return this.todosService.update(id,updateTodo)
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.todosService.remove(id)
    }
}
