import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	public getAllTasks(): Task[] {
		return this.tasks;
  }
  
  public getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if(status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if(search) {
      tasks = tasks.filter(task => 
        task.title.includes(search) ||
        task.description.includes(search),
      );
    }

    return tasks;
  }

	public getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id);
    
    if(!found){
        throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
	}

	public createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;
		const task: Task = {
			id: uuid(),
			title,
			description,
			status: TaskStatus.OPEN,
		};

		this.tasks.push(task);
		return task;
  }
  
  public deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
