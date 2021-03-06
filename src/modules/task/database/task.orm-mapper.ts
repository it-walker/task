import { TaskOrmEntity } from '@modules/task/database/task.orm-entity'
import { TaskEntity, TaskProps } from '@modules/task/domain/entities/task.entity'
import { TaskDueDate } from '@modules/task/domain/value-objects/task.due.date.value-object'
import { TaskName } from '@modules/task/domain/value-objects/task.name.value-object'
import { TaskPostponeCount } from '@modules/task/domain/value-objects/task.postpone.count.value-object'

import { UUID } from '@src/libs/ddd/domain/value-objects/uuid.value-object'
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@src/libs/ddd/infrastructure/database/base-classes/orm-mapper.base'

/**
 * TaskOrmMapper class
 */
export class TaskOrmMapper extends OrmMapper<TaskEntity, TaskOrmEntity> {
  /**
   *
   * @param {TaskOrmEntity} entity
   * @return {OrmEntityProps<TaskOrmEntity>}
   */
  protected toOrmProps(entity: TaskEntity): OrmEntityProps<TaskOrmEntity> {
    const props = entity.getPropsCopy()

    const ormProps: OrmEntityProps<TaskOrmEntity> = {
      name: props.name.value,
      dueDate: props.dueDate.value,
      postponeCount: props.postponeCount.value,
      status: props.status,
    }
    return ormProps
  }

  /**
   *
   * @param {TaskOrmEntity} ormEntity
   * @return {EntityProps<TaskProps>}
   */
  protected toDomainProps(ormEntity: TaskOrmEntity): EntityProps<TaskProps> {
    const id = new UUID(ormEntity.id)
    const props: TaskProps = {
      name: new TaskName(ormEntity.name),
      status: ormEntity.status,
      postponeCount: new TaskPostponeCount(ormEntity.postponeCount),
      dueDate: new TaskDueDate(ormEntity.dueDate),
    }
    return { id, props }
  }
}
