import { processMathOperation } from '../math/processMathOperation'
import {
  SafeAreaXAxisFunction,
  SafeAreaYAxisFunction,
  SuperviewXAxisFunction,
  SuperviewYAxisFunction,
  ViewXAxisFunction,
  ViewYAxisFunction
} from '../typings/Functions'
import { MathOperation } from '../typings/Math'
import { ProcessedConstraint } from '../typings/ProcessedConstraint'
import {
  ConstantRelation,
  MultiplierRelationX,
  MultiplierRelationY
} from '../typings/Relation'

function left(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SuperviewXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'safeArea',
      attribute: 'left',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'left',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
left.item = 'safeArea'
left.attribute = 'left'
left.xAxis = true

function right(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SuperviewXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'safeArea',
      attribute: 'right',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'right',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
right.item = 'safeArea'
right.attribute = 'right'
right.xAxis = true

function leading(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SuperviewXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'safeArea',
      attribute: 'leading',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'leading',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
leading.item = 'safeArea'
leading.attribute = 'leading'
leading.xAxis = true

function centerX(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SuperviewXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'safeArea',
      attribute: 'centerX',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'centerX',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
centerX.item = 'safeArea'
centerX.attribute = 'centerX'
centerX.xAxis = true

function trailing(
  relatedBy: ConstantRelation | MultiplierRelationX,
  item: ViewXAxisFunction | SuperviewXAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingAfter' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingAfter' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingAfter'
  ) {
    return {
      item: 'safeArea',
      attribute: 'trailing',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'trailing',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
trailing.item = 'safeArea'
trailing.attribute = 'trailing'
trailing.xAxis = true

function top(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SuperviewYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'safeArea',
      attribute: 'top',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'top',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
top.item = 'safeArea'
top.attribute = 'top'
top.yAxis = true

function centerY(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SuperviewYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'safeArea',
      attribute: 'centerY',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'centerY',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
centerY.item = 'safeArea'
centerY.attribute = 'centerY'
centerY.yAxis = true

function firstBaseline(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SuperviewYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'safeArea',
      attribute: 'firstBaseline',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'firstBaseline',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
firstBaseline.item = 'safeArea'
firstBaseline.attribute = 'firstBaseline'
firstBaseline.yAxis = true

function lastBaseline(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SuperviewYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'safeArea',
      attribute: 'lastBaseline',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'lastBaseline',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
lastBaseline.item = 'safeArea'
lastBaseline.attribute = 'lastBaseline'
lastBaseline.yAxis = true

function bottom(
  relatedBy: ConstantRelation | MultiplierRelationY,
  item: ViewYAxisFunction | SuperviewYAxisFunction,
  constant?: number | MathOperation
): ProcessedConstraint {
  if (
    relatedBy === 'equalToSystemSpacingBelow' ||
    relatedBy === 'greaterThanOrEqualToSystemSpacingBelow' ||
    relatedBy === 'lessThanOrEqualToSystemSpacingBelow'
  ) {
    return {
      item: 'safeArea',
      attribute: 'bottom',
      relatedBy: relatedBy,
      toItem: item.item,
      toAttribute: item.attribute,
      multiplier:
        typeof constant === 'function'
          ? processMathOperation(constant!)
          : constant!
    }
  }
  return {
    item: 'safeArea',
    attribute: 'bottom',
    relatedBy: relatedBy,
    toItem: item.item,
    toAttribute: item.attribute,
    constant:
      typeof constant === 'function'
        ? processMathOperation(constant!)
        : constant
  }
}
bottom.item = 'safeArea'
bottom.attribute = 'bottom'
bottom.yAxis = true

export const safeArea = {
  left: left as SafeAreaXAxisFunction,
  right: right as SafeAreaXAxisFunction,
  leading: leading as SafeAreaXAxisFunction,
  centerX: centerX as SafeAreaXAxisFunction,
  trailing: trailing as SafeAreaXAxisFunction,
  top: top as SafeAreaYAxisFunction,
  centerY: centerY as SafeAreaYAxisFunction,
  lastBaseline: lastBaseline as SafeAreaYAxisFunction,
  bottom: bottom as SafeAreaYAxisFunction
}
