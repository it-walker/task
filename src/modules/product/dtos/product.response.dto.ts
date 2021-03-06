import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

import { ProductEntity } from '@modules/product/domain/entities/product.entity'

import { Product } from '@src/interface-adapters/interfaces/product/product.interface'
import { ResponseBase } from '@src/libs/ddd/interface-adapters/base-classes/response.base'

@ObjectType()
/**
 * ProductResponse class
 */
export class ProductResponse extends ResponseBase implements Product {
  /**
   * constructor
   * @param {ProductEntity} product
   */
  constructor(product: ProductEntity) {
    super(product)

    const props = product.getPropsCopy()
    this.name = props.name.value
  }

  @ApiProperty({
    example: 'name',
    description: 'description',
  })
  @Field()
  name: string;
}

/**
 * ProductHttpResponse class
 */
export class ProductHttpResponse extends ProductResponse implements Product { }
