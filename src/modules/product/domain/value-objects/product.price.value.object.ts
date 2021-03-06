import {
  DomainPrimitive,
  ValueObject,
} from '@src/libs/ddd/domain/base-classes/value-object.base'
import { Guard } from '@src/libs/ddd/domain/guard'
import { ArgumentOutOfRangeException } from '@src/libs/exceptions'

/**
 * ProductPrice class
 */
export class ProductPrice extends ValueObject<number> {
  /**
   * constructor
   * @param {number} value
   */
  constructor(value: number) {
    super({ value })
    this.props.value = value
  }

  /**
   *
   */
  get value(): number {
    return this.props.value
  }

  /**
   *
   * @param {DomainPrimitive<number>} param0
   */
  protected validate({ value }: DomainPrimitive<number>): void {
    if (!Guard.lengthIsBetween(value, 0, 10)) {
      throw new ArgumentOutOfRangeException('price is out of range')
    }
  }
}
