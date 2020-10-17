import { EntityRepository, Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
	async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		const { title, description }: CreateTaskDto = createTaskDto;
		const task: Task = new Task();

		task.title = title;
		task.description = description;
		task.status = TaskStatus.OPEN;

		await task.save();

		return task;
	}

	async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
		const { status, search }: GetTasksFilterDto = filterDto;
		const query = this.createQueryBuilder('task');
		let tasks: Task[];

		if(status) query.andWhere('task.status = :status', { status });
		if(search) query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` });
		tasks = await query.getMany();
	
		return tasks;
	}
}