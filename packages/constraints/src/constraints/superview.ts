import {
  SafeAreaXAxisFunction,
  SafeAreaYAxisFunction,
  SuperviewDimensionFunction,
  SuperviewXAxisFunction,
  SuperviewYAxisFunction,
  ViewDimensionFunction,
  ViewXAxisFunction,
  ViewYAxisFunction
} from '../typings/Functions'
import { ProcessedConstraint } from '../typings/ProcessedConstraint'
import {
  ConstantRelation,
  MultiplierRelationX,
  MultiplierRelationY
} from '../typings/Relation'

function left(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'left',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'left',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
left.item = 'superview'
left.attribute = 'left'
left.xAxis = true

function right(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'right',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'right',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
right.item = 'superview'
right.attribute = 'right'
right.xAxis = true

function leading(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'leading',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'leading',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
leading.item = 'superview'
leading.attribute = 'leading'
leading.xAxis = true

function centerX(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'centerX',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'centerX',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
centerX.item = 'superview'
centerX.attribute = 'centerX'
centerX.xAxis = true

function trailing(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'trailing',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'trailing',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
trailing.item = 'superview'
trailing.attribute = 'trailing'
trailing.xAxis = true

function leftMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'leftMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'leftMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
leftMargin.item = 'superview'
leftMargin.attribute = 'leftMargin'
leftMargin.xAxis = true

function rightMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'rightMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'rightMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
rightMargin.item = 'superview'
rightMargin.attribute = 'rightMargin'
rightMargin.xAxis = true

function leadingMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'leadingMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'leadingMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
leadingMargin.item = 'superview'
leadingMargin.attribute = 'leadingMargin'
leadingMargin.xAxis = true

function centerXWithinMargins(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'centerXWithinMargins',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'centerXWithinMargins',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
centerXWithinMargins.item = 'superview'
centerXWithinMargins.attribute = 'centerXWithinMargins'
centerXWithinMargins.xAxis = true

function trailingMargin(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SafeAreaXAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'superview',
      attribute: 'trailingMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'trailingMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
trailingMargin.item = 'superview'
trailingMargin.attribute = 'trailingMargin'
trailingMargin.xAxis = true

function top(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'top',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'top',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
top.item = 'superview'
top.attribute = 'top'
top.yAxis = true

function centerY(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'centerY',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'centerY',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
centerY.item = 'superview'
centerY.attribute = 'centerY'
centerY.yAxis = true

function firstBaseline(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'firstBaseline',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'firstBaseline',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
firstBaseline.item = 'superview'
firstBaseline.attribute = 'firstBaseline'
firstBaseline.yAxis = true

function lastBaseline(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'lastBaseline',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'lastBaseline',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
lastBaseline.item = 'superview'
lastBaseline.attribute = 'lastBaseline'
lastBaseline.yAxis = true

function bottom(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'bottom',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'bottom',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
bottom.item = 'superview'
bottom.attribute = 'bottom'
bottom.yAxis = true

function topMargin(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'topMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'topMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
topMargin.item = 'superview'
topMargin.attribute = 'topMargin'
topMargin.yAxis = true

function bottomMargin(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'bottomMargin',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'bottomMargin',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
bottomMargin.item = 'superview'
bottomMargin.attribute = 'bottomMargin'
bottomMargin.yAxis = true

function centerYWithinMargins(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SafeAreaYAxisFunction,
  constant?: number
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'superview',
      attribute: 'centerYWithinMargins',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier: constant!
    }
  }
  return {
    item: 'superview',
    attribute: 'centerYWithinMargins',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant
  }
}
centerYWithinMargins.item = 'superview'
centerYWithinMargins.attribute = 'centerYWithinMargins'
centerYWithinMargins.yAxis = true

function width(
  relatedBy: ConstantRelation,
  itemOrConstant: ViewDimensionFunction | SuperviewDimensionFunction | number,
  multiplier?: number,
  constant?: number
): ProcessedConstraint {
  if (typeof itemOrConstant === 'number') {
    return {
      item: 'superview',
      attribute: 'width',
      relatedBy: relatedBy,
      toItem: undefined,
      toAttribute: undefined,
      constant: itemOrConstant!
    }
  }
  return {
    item: 'superview',
    attribute: 'width',
    relatedBy: relatedBy,
    toItem: itemOrConstant.item,
    toAttribute: itemOrConstant.attribute,
    multiplier: multiplier,
    constant: constant
  }
}
width.item = 'superview'
width.attribute = 'width'
width.dimension = true

function height(
  relatedBy: ConstantRelation,
  itemOrConstant: ViewDimensionFunction | SuperviewDimensionFunction | number,
  multiplier?: number,
  constant?: number
): ProcessedConstraint {
  if (typeof itemOrConstant === 'number') {
    return {
      item: 'superview',
      attribute: 'height',
      relatedBy: relatedBy,
      toItem: undefined,
      toAttribute: undefined,
      constant: itemOrConstant!
    }
  }
  return {
    item: 'superview',
    attribute: 'height',
    relatedBy: relatedBy,
    toItem: itemOrConstant.item,
    toAttribute: itemOrConstant.attribute,
    multiplier: multiplier,
    constant: constant
  }
}
height.item = 'superview'
height.attribute = 'height'
height.dimension = true

export const superview = {
  left: left as SuperviewXAxisFunction,
  right: right as SuperviewXAxisFunction,
  leading: leading as SuperviewXAxisFunction,
  centerX: centerX as SuperviewXAxisFunction,
  trailing: trailing as SuperviewXAxisFunction,
  leftMargin: leftMargin as SuperviewXAxisFunction,
  rightMargin: rightMargin as SuperviewXAxisFunction,
  leadingMargin: leadingMargin as SuperviewXAxisFunction,
  trailingMargin: trailingMargin as SuperviewXAxisFunction,
  top: top as SuperviewYAxisFunction,
  centerY: centerY as SuperviewYAxisFunction,
  firstBaseline: firstBaseline as SuperviewYAxisFunction,
  lastBaseline: lastBaseline as SuperviewYAxisFunction,
  bottom: bottom as SuperviewYAxisFunction,
  topMargin: topMargin as SuperviewYAxisFunction,
  bottomMargin: bottomMargin as SuperviewYAxisFunction,
  centerYWithinMargins: centerYWithinMargins as SuperviewYAxisFunction,
  width: width as SuperviewDimensionFunction,
  height: height as SuperviewDimensionFunction
}
