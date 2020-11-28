export type ConstantRelation =
  | 'equalTo'
  | 'lessThanOrEqualTo'
  | 'greaterThenOrEqualTo'

export type MultiplierRelationX =
  | 'equalToSystemSpacingAfter'
  | 'greaterThanOrEqualToSystemSpacingAfter'
  | 'lessThanOrEqualToSystemSpacingAfter'

export type MultiplierRelationY =
  | 'equalToSystemSpacingBelow'
  | 'greaterThanOrEqualToSystemSpacingBelow'
  | 'lessThanOrEqualToSystemSpacingBelow'

export type Relation =
  | ConstantRelation
  | MultiplierRelationX
  | MultiplierRelationY
