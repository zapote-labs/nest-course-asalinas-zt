import { PipeTransform, BadRequestException } from "@nestjs/common";

import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses: string[] = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  
  public transform(value: string) {
    value = value.toUpperCase();

    if(!this.isSatusValid(value)) {
      throw new BadRequestException(`"${value} is an invalid status`);
    }

    return value;    
  }

  private isSatusValid(status: string) {
    const idx: number = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}