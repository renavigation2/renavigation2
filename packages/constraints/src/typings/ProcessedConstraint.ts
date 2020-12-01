import { Attribute } from './Attribute'
import { Item } from './Item'
import { ProcessedMathOperation, MathValue } from './Math'
import { Relation } from './Relation'

export interface ProcessedConstraint {
  item: Item
  attribute: Attribute
  relatedBy: Relation
  toItem?: Item
  toAttribute?: Attribute
  multiplier?: ProcessedMathOperation | MathValue | number
  constant?: ProcessedMathOperation | MathValue | number
}
