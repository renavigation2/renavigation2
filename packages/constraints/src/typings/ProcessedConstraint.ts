import { Attribute } from './Attribute'
import { Item } from './Item'
import { Relation } from './Relation'

export interface ProcessedConstraint {
  item: Item
  attribute: Attribute
  relatedBy: Relation
  toItem?: Item
  toAttribute?: Attribute
  multiplier?: number
  constant?: number
}
