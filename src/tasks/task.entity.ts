import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import { TaskStatus } from './task-status.enum';

@Entity()
export class Task extends BaseEntity {
	@PrimaryGeneratedColumn()
	public id: number;

	@Column()
	public title: string;

	@Column()
	public description: string;

	@Column()
	public status: TaskStatus;
}