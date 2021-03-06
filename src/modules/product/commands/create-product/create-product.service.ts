import { Result } from '@badrap/result'
import { CommandHandler } from '@nestjs/cqrs'

import { CreateProductCommand } from '@modules/product/commands/create-product/create-product.command'
import { ProductEntity } from '@modules/product/domain/entities/product.entity'
import { ProductDescription } from '@modules/product/domain/value-objects/product.description.value.object'
import { ProductName } from '@modules/product/domain/value-objects/product.name.value.object'
import { ProductPrice } from '@modules/product/domain/value-objects/product.price.value.object'

import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work'
import { CommandHandlerBase } from '@src/libs/ddd/domain/base-classes/command-handler.base'
import { ID } from '@src/libs/ddd/domain/value-objects/id.value-object'
import { ProductRepositoryPort } from '@src/modules/product/database/product.repository.port'
import { ProductAlreadyExistsError } from '@src/modules/product/errors/product.error'

@CommandHandler(CreateProductCommand)
/**
 * CreateProductService class
 */
export class CreateProductService extends CommandHandlerBase {
  /**
   * constructor
   * @param {UnitOfWork} unitOrWork
   */
  constructor(protected readonly unitOrWork: UnitOfWork) {
    super(unitOrWork)
  }

  /**
   *
   * @param {CreateProductCommand} command
   * @return {Promise<Result<ID, ProductAlreadyExistsError>>}
   */
  async handle(
    command: CreateProductCommand,
  ): Promise<Result<ID, ProductAlreadyExistsError>> {
    const productRepository: ProductRepositoryPort =
      this.unitOrWork.getProductRepository(command.correlationId)

    if (await productRepository.exists(command.name)) {
      return Result.err(new ProductAlreadyExistsError())
    }
    const product = ProductEntity.create({
      name: new ProductName(command.name),
      description: new ProductDescription(command.description),
      price: new ProductPrice(command.price),
    })

    product.someBusinessLogic()

    const created = await productRepository.save(product)
    return Result.ok(created.id)
  }
}
