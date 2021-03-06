import { Injectable } from '@nestjs/common'

import { TypeormUnitOfWork } from '@libs/ddd/infrastructure/database/base-classes/typeorm-unit-of-work'

import { ClubOrmEntity } from '@modules/club/database/club.orm-entity'
import { ClubRepository } from '@modules/club/database/club.repository'
import { ClubMemberOrmEntity } from '@modules/clubMember/database/club.member.orm-entity'
import { ClubMemberRepository } from '@modules/clubMember/database/club.member.repository'
import { MailaddressOrmEntity } from '@modules/mailaddress/database/mailaddress.orm-entity'
import { MailaddressRepository } from '@modules/mailaddress/database/mailaddress.repository'
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity'
import { ProductRepository } from '@modules/product/database/product.repository'
import { StudentOrmEntity } from '@modules/student/database/student.orm-entity'
import { StudentRepository } from '@modules/student/database/student.repository'
import { TaskOrmEntity } from '@modules/task/database/task.orm-entity'
import { TaskRepository } from '@modules/task/database/task.repository'
import { UserOrmEntity } from '@modules/user/database/user.orm-entity'
import { UserRepository } from '@modules/user/database/user.repository'
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity'
import { WalletRepository } from '@modules/wallet/database/wallet.repository'

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  /**
   * get UserRepository
   * @param {string} correlationId
   * @return {UserRepository}
   */
  getUserRepository(correlationId: string): UserRepository {
    return new UserRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }

  /**
   * get WalletRepository
   * @param {string} correlationId
   * @return {WalletRepository}
   */
  getWalletRepository(correlationId: string): WalletRepository {
    return new WalletRepository(
      this.getOrmRepository(WalletOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }

  /**
   * get MailaddressRepository
   * @param {string} correlationId
   * @return {MailaddressRepository}
   */
  getMailaddressRepository(correlationId: string): MailaddressRepository {
    return new MailaddressRepository(
      this.getOrmRepository(MailaddressOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }

  /**
   * get ProductRepository
   * @param {string} correlationId
   * @return {ProductRepository}
   */
  getProductRepository(correlationId: string): ProductRepository {
    return new ProductRepository(
      this.getOrmRepository(ProductOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }

  /**
   * get TaskRepository
   * @param {string} correlationId
   * @return {TaskRepository}
   */
  getTaskRepository(correlationId: string): TaskRepository {
    return new TaskRepository(
      this.getOrmRepository(TaskOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }

  /**
   * get ClubRepository
   * @param {string} correlationId
   * @return {ClubRepository}
   */
  getClubRepository(correlationId: string): ClubRepository {
    return new ClubRepository(
      this.getOrmRepository(ClubOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }

  /**
   * get ClubMemberRepository
   * @param {string} correlationId
   * @return {ClubMemberRepository}
   */
  getClubMemberRepository(correlationId: string): ClubMemberRepository {
    return new ClubMemberRepository(
      this.getOrmRepository(ClubMemberOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }

  /**
   * get StudentRepository
   * @param {string} correlationId
   * @return {StudentRepository}
   */
  getStudentRepository(correlationId: string): StudentRepository {
    return new StudentRepository(
      this.getOrmRepository(StudentOrmEntity, correlationId),
    ).setCorrelationId(correlationId)
  }
}
